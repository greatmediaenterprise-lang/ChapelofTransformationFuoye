import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return jsonResponse({ error: "Message service is unavailable" }, 500);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  if (!body || typeof body !== "object") return jsonResponse({ error: "Invalid request body" }, 400);
  const payload = body as Record<string, unknown>;
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (payload.action === "submit") {
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    if (name.length < 1 || name.length > 120) return jsonResponse({ error: "Enter a name of 1 to 120 characters" }, 400);
    if (email.length < 3 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "Enter a valid email address" }, 400);
    }
    if (message.length < 1 || message.length > 5000) return jsonResponse({ error: "Message must be 1 to 5000 characters" }, 400);

    const { data, error } = await adminClient
      .from("contact_submissions")
      .insert({ name, email, message })
      .select("id")
      .single();
    if (error) return jsonResponse({ error: "Could not save the message" }, 500);
    return jsonResponse({ ok: true, id: data.id }, 201);
  }

  if (payload.action === "list") {
    const authorization = request.headers.get("Authorization");
    const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!token) return jsonResponse({ error: "Sign in as an admin to view messages" }, 401);

    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: userData, error: authError } = await authClient.auth.getUser(token);
    if (authError || !userData.user) return jsonResponse({ error: "Sign in as an admin to view messages" }, 401);

    const { data: adminRole, error: roleError } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleError) return jsonResponse({ error: "Could not verify admin access" }, 500);
    if (!adminRole) return jsonResponse({ error: "Admin access required" }, 403);

    const { data: submissions, error: listError } = await adminClient
      .from("contact_submissions")
      .select("id, name, email, message, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (listError) return jsonResponse({ error: "Could not load messages" }, 500);
    return jsonResponse({ submissions: submissions ?? [] });
  }

  return jsonResponse({ error: "Unknown action" }, 400);
});