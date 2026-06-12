import { createClient } from "@/lib/supabase/server";

type ContentMap = Record<string, string>;

/**
 * Fetches a specific section from site_content table.
 * Falls back to empty object if the section doesn't exist yet.
 */
export async function getSiteContent(sectionKey: string): Promise<ContentMap> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_content")
      .select("content_json")
      .eq("section_key", sectionKey)
      .single();

    if (data?.content_json) {
      return data.content_json as ContentMap;
    }
    return {};
  } catch {
    return {};
  }
}

/**
 * Fetches ALL sections at once. Returns a map of { sectionKey: ContentMap }.
 */
export async function getAllSiteContent(): Promise<Record<string, ContentMap>> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_content").select("*");

    if (!data) return {};
    return Object.fromEntries(
      data.map((row) => [row.section_key, row.content_json as ContentMap])
    );
  } catch {
    return {};
  }
}
