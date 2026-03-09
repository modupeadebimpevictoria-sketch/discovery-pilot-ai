const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    const searchQuery = query || "internship";

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      // Return curated fallback data when Firecrawl isn't available
      return new Response(
        JSON.stringify({ success: true, opportunities: getFallbackOpportunities(searchQuery) }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Search for Nigerian internships and opportunities
    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `${searchQuery} internship opportunity Nigeria students Grade 10 11 12 2025 2026`,
        limit: 10,
        lang: 'en',
        country: 'NG',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Firecrawl search error:', response.status, errText);
      // Fall back to curated data
      return new Response(
        JSON.stringify({ success: true, opportunities: getFallbackOpportunities(searchQuery) }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const results = data.data || [];

    // Parse search results into opportunity format
    const opportunities = results
      .filter((r: any) => r.title && r.url)
      .map((r: any) => ({
        title: r.title || "Opportunity",
        company: extractCompany(r.url, r.description),
        location: "Nigeria",
        url: r.url,
        type: categorizeOpportunity(r.title, r.description),
      }))
      .slice(0, 8);

    // Mix with curated fallbacks
    const combined = [...opportunities, ...getFallbackOpportunities(searchQuery).slice(0, 4)];

    return new Response(
      JSON.stringify({ success: true, opportunities: combined }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in scrape-opportunities:', error);
    return new Response(
      JSON.stringify({ success: true, opportunities: getFallbackOpportunities("internship") }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractCompany(url: string, desc?: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    const parts = hostname.split('.');
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  } catch {
    return "Organisation";
  }
}

function categorizeOpportunity(title: string, desc?: string): string {
  const text = `${title} ${desc || ""}`.toLowerCase();
  if (text.includes("intern")) return "Internship";
  if (text.includes("shadow")) return "Job Shadowing";
  if (text.includes("scholarship")) return "Scholarship";
  if (text.includes("competition") || text.includes("hackathon")) return "Competition";
  if (text.includes("program") || text.includes("programme")) return "Program";
  return "Internship";
}

function getFallbackOpportunities(query: string) {
  return [
    { title: "HNG Internship Programme", company: "HNG Tech", location: "Nigeria (Remote)", url: "https://hng.tech", type: "Internship" },
    { title: "Andela Learning Community", company: "Andela", location: "Nigeria", url: "https://andela.com", type: "Program" },
    { title: "Google Africa Developer Scholarship", company: "Google", location: "Nigeria / Remote", url: "https://goo.gle/africa-scholarship", type: "Scholarship" },
    { title: "CcHub Design Lab Internship", company: "Co-Creation Hub", location: "Lagos, Nigeria", url: "https://cchubnigeria.com", type: "Internship" },
    { title: "UNICEF Youth Programme", company: "UNICEF Nigeria", location: "Abuja, Nigeria", url: "https://unicef.org/nigeria", type: "Program" },
    { title: "Tony Elumelu Foundation Entrepreneurship", company: "TEF", location: "Nigeria / Africa", url: "https://tonyelumelufoundation.org", type: "Program" },
    { title: "GTBank Internship Programme", company: "Guaranty Trust Bank", location: "Lagos, Nigeria", url: "https://gtbank.com", type: "Internship" },
    { title: "Interswitch Graduate Trainee", company: "Interswitch", location: "Lagos, Nigeria", url: "https://interswitchgroup.com/careers", type: "Internship" },
    { title: "Shell Nigeria Student Industrial Training", company: "Shell", location: "Nigeria", url: "https://shell.com.ng", type: "Internship" },
    { title: "Flutterwave Work-Study Programme", company: "Flutterwave", location: "Lagos / Remote", url: "https://flutterwave.com/careers", type: "Internship" },
  ];
}
