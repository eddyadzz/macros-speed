import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InstagramMedia {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface InstagramResponse {
  data: InstagramMedia[];
  paging?: {
    cursors?: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const instagramAccessToken = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");

    if (!instagramAccessToken) {
      return new Response(
        JSON.stringify({ 
          error: "Instagram access token not configured",
          message: "Please set INSTAGRAM_ACCESS_TOKEN in your environment variables"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const instagramUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${instagramAccessToken}&limit=12`;

    const instagramResponse = await fetch(instagramUrl);
    
    if (!instagramResponse.ok) {
      const errorData = await instagramResponse.text();
      console.error("Instagram API error:", errorData);
      return new Response(
        JSON.stringify({ 
          error: "Failed to fetch from Instagram",
          details: errorData
        }),
        {
          status: instagramResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const instagramData: InstagramResponse = await instagramResponse.json();
    const posts = instagramData.data || [];

    let insertedCount = 0;
    let updatedCount = 0;

    for (const post of posts) {
      const { data: existing } = await supabase
        .from("instagram_posts")
        .select("id")
        .eq("instagram_id", post.id)
        .maybeSingle();

      const postData = {
        instagram_id: post.id,
        media_type: post.media_type,
        media_url: post.media_url,
        thumbnail_url: post.thumbnail_url || null,
        permalink: post.permalink,
        caption: post.caption || null,
        timestamp: post.timestamp,
        updated_at: new Date().toISOString(),
      };

      if (existing) {
        const { error } = await supabase
          .from("instagram_posts")
          .update(postData)
          .eq("instagram_id", post.id);

        if (error) {
          console.error("Error updating post:", error);
        } else {
          updatedCount++;
        }
      } else {
        const { error } = await supabase
          .from("instagram_posts")
          .insert(postData);

        if (error) {
          console.error("Error inserting post:", error);
        } else {
          insertedCount++;
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Synced ${posts.length} posts from Instagram`,
        inserted: insertedCount,
        updated: updatedCount,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
