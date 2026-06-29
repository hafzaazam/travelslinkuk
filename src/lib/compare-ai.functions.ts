import { createServerFn } from "@tanstack/react-start";

type SuggestInput = {
  visaType: string;
  countries: Array<{
    name: string;
    slug: string;
    processingTime: string;
    currency: string;
    visas: string[];
    pros: string[];
    cons: string[];
    profile?: {
      costTier?: string;
      dailyBudget?: string;
      lifestyle?: string;
      medical?: string;
      safety?: string;
      bestSeason?: string;
    };
  }>;
};

export const suggestBestCountry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input as SuggestInput)
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    if (!data.countries || data.countries.length === 0) {
      return { suggestion: "Select at least one country to get an AI recommendation." };
    }

    const summary = data.countries
      .map(
        (c) =>
          `- ${c.name}: processing ${c.processingTime}; cost ${c.profile?.costTier ?? "n/a"} (${c.profile?.dailyBudget ?? "n/a"}/day); lifestyle: ${c.profile?.lifestyle ?? "n/a"}; medical: ${c.profile?.medical ?? "n/a"}; safety: ${c.profile?.safety ?? "n/a"}; best season: ${c.profile?.bestSeason ?? "n/a"}; visas: ${c.visas.join(", ")}; pros: ${c.pros.join("; ")}; cons: ${c.cons.join("; ")}`
      )
      .join("\n");

    const prompt = `You are a UK-based visa consultant. The traveller is comparing these destinations${
      data.visaType !== "all" ? ` for a ${data.visaType}` : ""
    }:\n\n${summary}\n\nWrite a concise, friendly recommendation (max ~140 words). Pick ONE best overall match and explain why in 2–3 short sentences, then add a single line "Also consider:" mentioning the runner-up and what kind of traveller it suits. Use plain prose, no markdown headings, no bullet lists.`;

    // Free-tier model fallback chain — try cheap/fast OpenAI first,
    // then Google Gemini free models. Lovable AI Gateway does not host Llama.
    const models = [
      "openai/gpt-5-nano",
      "openai/gpt-5-mini",
      "google/gemini-2.5-flash-lite",
      "google/gemini-2.5-flash",
      "google/gemini-3-flash-preview",
    ];

    let lastErr = "";
    for (const model of models) {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: "You are a helpful, concise UK visa consultant." },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (res.ok) {
        const json = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const suggestion =
          json.choices?.[0]?.message?.content?.trim() ?? "No suggestion returned.";
        return { suggestion, model };
      }

      const body = await res.text();
      lastErr = `${model} → ${res.status}: ${body.slice(0, 160)}`;
      // Only fall through on rate-limit / credit / model-availability errors.
      if (res.status !== 429 && res.status !== 402 && res.status !== 404) {
        throw new Error(`AI request failed (${res.status}): ${body.slice(0, 200)}`);
      }
    }

    throw new Error(`All free AI models unavailable. Last error: ${lastErr}`);
  });
