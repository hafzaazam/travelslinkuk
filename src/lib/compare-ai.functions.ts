import { createServerFn } from "@tanstack/react-start";
import { getConfiguredModelProviders } from "@/lib/ai-gateway.server";

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
    const configuredModels = getConfiguredModelProviders();
    if (configuredModels.length === 0) {
      throw new Error(
        "Missing AI model configuration. Set MODEL1_API_KEY and MODEL1_BASE_URL (and optionally MODEL2_API_KEY / MODEL2_BASE_URL).",
      );
    }
    if (!data.countries || data.countries.length === 0) {
      return { suggestion: "Select at least one country to get an AI recommendation." };
    }

    const summary = data.countries
      .map(
        (c) =>
          `- ${c.name}: processing ${c.processingTime}; cost ${c.profile?.costTier ?? "n/a"} (${c.profile?.dailyBudget ?? "n/a"}/day); lifestyle: ${c.profile?.lifestyle ?? "n/a"}; medical: ${c.profile?.medical ?? "n/a"}; safety: ${c.profile?.safety ?? "n/a"}; best season: ${c.profile?.bestSeason ?? "n/a"}; visas: ${c.visas.join(", ")}; pros: ${c.pros.join("; ")}; cons: ${c.cons.join("; ")}`,
      )
      .join("\n");

    const prompt = `You are a UK-based visa consultant. The traveller is comparing these destinations${
      data.visaType !== "all" ? ` for a ${data.visaType}` : ""
    }:\n\n${summary}\n\nWrite a concise, friendly recommendation (max ~140 words). Pick ONE best overall match and explain why in 2–3 short sentences, then add a single line "Also consider:" mentioning the runner-up and what kind of traveller it suits. Use plain prose, no markdown headings, no bullet lists.`;

    let lastErr = "";
    for (const modelConfig of configuredModels) {
      const baseUrl = modelConfig.baseURL.replace(/\/$/, "");
      const endpoint = baseUrl.includes("/chat/completions")
        ? baseUrl
        : `${baseUrl}/chat/completions`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${modelConfig.apiKey}`,
        },
        body: JSON.stringify({
          model: modelConfig.modelId ?? "gpt-4o-mini",
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
        return { suggestion, model: modelConfig.modelId ?? modelConfig.name };
      }

      const body = await res.text();
      lastErr = `${modelConfig.name} → ${res.status}: ${body.slice(0, 160)}`;
      if (res.status !== 429 && res.status !== 402 && res.status !== 404) {
        throw new Error(`AI request failed (${res.status}): ${body.slice(0, 200)}`);
      }
    }

    throw new Error(`All configured AI models unavailable. Last error: ${lastErr}`);
  });
