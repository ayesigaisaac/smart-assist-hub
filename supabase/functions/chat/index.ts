import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompts: Record<string, string> = {
  budget: `You are SmartAssist Budget Planner — a friendly financial advisor. Help users:
- Analyze income vs expenses
- Categorize spending (housing, food, transport, entertainment, savings, etc.)
- Create monthly budgets and summaries
- Provide saving tips and strategies
- Suggest expense reduction ideas
Always be encouraging and practical. Use simple language. When users share numbers, organize them clearly. If they ask for a chart or summary, format data in a structured way with categories and amounts.`,

  health: `You are SmartAssist Health Assistant — a wellness companion. Help users with:
- General wellness and lifestyle tips
- Nutrition suggestions and meal ideas
- Exercise plans and fitness guidance
- Explaining symptoms in simple terms
- Sleep and stress management advice
IMPORTANT DISCLAIMER: Always remind users that you provide general wellness information only, NOT medical diagnoses. Always recommend consulting a healthcare professional for medical concerns.`,

  school: `You are SmartAssist School Helper — an educational tutor. Help users with:
- Explaining homework concepts clearly
- Creating study plans and schedules
- Summarizing notes and textbook content
- Generating practice quiz questions
- Study tips and learning strategies
Be patient, encouraging, and break complex topics into simple steps. Use examples when explaining concepts.`,

  agriculture: `You are SmartAssist Agriculture Advisor — a farming companion. Help users with:
- Crop selection and planting tips
- Soil care and preparation advice
- Pest and disease control suggestions
- Weather-based farming recommendations
- Irrigation and water management
- Post-harvest handling tips
Be practical and consider small-scale and subsistence farming contexts. Use simple, accessible language.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = systemPrompts[mode] || systemPrompts.budget;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
