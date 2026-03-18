import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteContent = Record<string, Record<string, string>>;

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
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
    };
    fetch();
  }, []);

  const get = (section: string, key: string, fallback = "") =>
    content[section]?.[key] ?? fallback;

  return { content, get, loading };
};
