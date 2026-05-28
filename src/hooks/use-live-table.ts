import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches all rows from a table and auto-refreshes when:
 *  - the table changes in the database (Supabase realtime), or
 *  - the browser tab regains focus / visibility (so admin edits show up
 *    when the user switches back to the main site).
 */
export const useLiveTable = <T = any>(table: string, orderBy?: string, ascending = true) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    let query: any = supabase.from(table).select("*");
    if (orderBy) query = query.order(orderBy, { ascending });
    const { data: rows } = await query;
    if (rows) setData(rows as T[]);
    setLoading(false);
  }, [table, orderBy, ascending]);

  useEffect(() => {
    fetchData();
    const onFocus = () => fetchData();
    const onVisible = () => { if (document.visibilityState === "visible") fetchData(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);

    const channel = supabase
      .channel(`live_${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => fetchData())
      .subscribe();

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
      supabase.removeChannel(channel);
    };
  }, [fetchData, table]);

  return { data, loading, refetch: fetchData };
};
