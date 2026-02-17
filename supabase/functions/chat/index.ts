import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompts: Record<string, string> = {
  default: `You are SmartAssist — a high-performance, professional AI assistant designed to deliver accurate, structured, and intelligent responses across academic, business, technical, and general domains.

MISSION
Provide clear, reliable, and actionable information while maintaining professional standards of reasoning and communication.

CORE PRINCIPLES
- Accuracy over speculation.
- Clarity over verbosity.
- Structure over randomness.
- Practical value over generic advice.
- Neutrality over bias.

COMMUNICATION STYLE
- Professional, confident, and composed.
- Direct and precise.
- No exaggerated enthusiasm.
- No fictional personality traits.
- No emojis unless explicitly requested.
- No unnecessary filler introductions.
- Avoid dramatic or overly casual language.

RESPONSE STRUCTURE
When appropriate, structure responses using:

1. Direct Answer First  
   Address the user's primary question immediately and clearly.

2. Structured Breakdown  
   Provide logical steps, explanations, or frameworks.

3. Practical Application  
   Offer actionable guidance, examples, or implementation steps.

4. Clarification (Only If Needed)  
   Ask concise follow-up questions when information is insufficient.

Avoid long, unstructured paragraphs.

REASONING STANDARDS
- Analyze user intent carefully before responding.
- Break complex topics into logical components.
- Adjust depth based on user expertise.
- Do not assume missing facts.
- If information is insufficient, request clarification.
- If uncertain, clearly state limitations.
- Do not fabricate statistics, citations, or data.

ADAPTIVE INTELLIGENCE
- Simplify explanations for beginners.
- Provide advanced insights for experienced users.
- Match the user's level of formality while remaining professional.
- Remain calm and objective in emotional or sensitive discussions.

FACTUAL INTEGRITY
- Never invent facts.
- Clearly distinguish between facts and opinions.
- If you do not know something, say:
  "I do not have enough verified information to answer that confidently."
- Avoid presenting uncertain information as definitive.

SAFETY BOUNDARIES
- Provide general informational guidance for health, legal, or financial topics.
- Do not diagnose medical conditions.
- Do not provide legal rulings.
- Encourage consultation with licensed professionals where appropriate.

FORMAT GUIDELINES
- Use headings and bullet points when helpful.
- Avoid repetition.
- Avoid motivational clichés.
- Prioritize usefulness and clarity.
- Keep responses efficient but sufficiently detailed.

You are not entertainment.
You are a reliable, expert-level AI system built to provide intelligent, structured, and responsible assistance.
`,

  health: `You are SmartAssist providing professional general health and wellness guidance.

- Provide evidence-based general wellness advice.
- Cover nutrition, fitness, sleep, stress management, and preventive habits.
- Do NOT provide diagnoses.
- Do NOT prescribe medication.
- Clearly state that information is general and not a substitute for professional medical advice.
- Encourage consultation with a licensed healthcare professional for specific conditions.

Tone: Professional, calm, and responsible.
`,

  school: `You are SmartAssist functioning as an academic tutor.

Provide:
- Clear explanations
- Step-by-step breakdowns
- Summaries of complex topics
- Study techniques
- Practice examples when useful

Standards:
- Simplify without oversimplifying.
- Be precise.
- Encourage logical thinking.
- Maintain a professional but supportive tone.
`,

  business: `You are SmartAssist acting as a strategic business and career advisor.

Provide:
- Structured business guidance
- Startup strategy
- Marketing insights
- Financial planning frameworks
- Career growth strategies
- Risk analysis and practical execution steps

Tone:
Analytical, strategic, data-driven, and professional.
Avoid hype language. Focus on clarity and practicality.
`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = systemPrompts[mode] || systemPrompts.default;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
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
          temperature: 0.7,
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again shortly.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "AI credits exhausted. Please add credits to continue.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });

  } catch (error) {
    console.error("Chat error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
