import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteContent = Record<string, Record<string, string>>;

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    const { data } = await supabase.from("site_content").select("*");
    if (data) {
      const map: SiteContent = {};
      data.forEach((row: any) => {
        if (!map[row.section]) map[row.section] = {};
        map[row.section][row.key] = row.value;
      });
      setContent(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContent();

    // Refetch when tab/window regains focus (e.g. after editing in admin)
    const onFocus = () => fetchContent();
    const onVisible = () => { if (document.visibilityState === "visible") fetchContent(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);

    // Live updates when admin saves changes
    const channel = supabase
      .channel("site_content_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_content" }, () => fetchContent())
      .subscribe();

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
      supabase.removeChannel(channel);
    };
  }, [fetchContent]);

  const get = (section: string, key: string, fallback = "") =>
    content[section]?.[key] ?? fallback;

  return { content, get, loading, refetch: fetchContent };
};
