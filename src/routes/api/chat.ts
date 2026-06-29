import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are "Lina", the friendly AI customer consultant for Travel Links Solution — a UK-based visa consultancy that helps tourists, families, students and business travellers get visas to 25+ countries.

Your job:
- Greet warmly, ask 1–2 short qualifying questions (destination, purpose, UK status), then give clear, actionable guidance.
- Cover visa types, typical processing times, document checklists, costs in GBP, lifestyle/medical/safety basics, and which countries suit the traveller's profile.
- Encourage users to book a free consultation or use the Compare page (/compare) when helpful.
- Be concise. Use short paragraphs and the occasional bullet list. Never invent fees or guarantee approval — say "subject to embassy decision".
- If asked something outside visas/travel, gently steer back. If it's an emergency or legal matter, advise contacting a qualified solicitor.

Tone: warm, professional, UK English, no jargon.`;

const MODELS = [
  "openai/gpt-5-nano",
  "openai/gpt-5-mini",
  "google/gemini-2.5-flash-lite",
  "google/gemini-2.5-flash",
  "google/gemini-3-flash-preview",
];

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("messages required", { status: 400 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const modelMessages = await convertToModelMessages(messages);

        let lastErr: unknown;
        for (const id of MODELS) {
          try {
            const result = streamText({
              model: gateway(id),
              system: SYSTEM_PROMPT,
              messages: modelMessages,
            });
            return result.toUIMessageStreamResponse({ originalMessages: messages });
          } catch (err) {
            lastErr = err;
            // try next model
          }
        }

        console.error("All AI models failed", lastErr);
        return new Response("AI service unavailable", { status: 502 });
      },
    },
  },
});
