import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

type ProviderKind = "ollama" | "gemini" | "openai";

type AiModelConfig = {
  name: string;
  apiKey?: string;
  baseURL: string;
  modelId?: string;
  provider: ProviderKind;
};

function readEnvValue(prefix: string, suffix: string) {
  const value = process.env[`${prefix}_${suffix}`];
  return value?.trim() ? value : undefined;
}

function getProviderDefaults(prefix: string) {
  switch (prefix.toUpperCase()) {
    case "OLLAMA":
      return {
        provider: "ollama" as const,
        baseURL: "http://localhost:11434/v1",
        name: "ollama",
      };
    case "GEMINI":
      return {
        provider: "gemini" as const,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        name: "gemini",
      };
    case "OPENAI":
    default:
      return {
        provider: "openai" as const,
        baseURL: "https://api.openai.com/v1",
        name: "openai",
      };
  }
}

export function getConfiguredModelProviders(
  prefixes: string[] = ["OPENAI", "GEMINI", "OLLAMA", "MODEL1", "MODEL2", "MODEL3"],
): AiModelConfig[] {
  return prefixes.flatMap((prefix) => {
    const defaults = getProviderDefaults(prefix);
    const apiKey = readEnvValue(prefix, "API_KEY");
    const modelId = readEnvValue(prefix, "MODEL_ID");
    const provider =
      (readEnvValue(prefix, "PROVIDER")?.toLowerCase() as ProviderKind | undefined) ??
      defaults.provider;
    const baseURL = readEnvValue(prefix, "BASE_URL") ?? defaults.baseURL;
    const name = readEnvValue(prefix, "NAME") ?? defaults.name;

    if (provider !== "ollama" && !apiKey) return [];

    return [
      {
        name,
        apiKey,
        baseURL,
        modelId,
        provider,
      } satisfies AiModelConfig,
    ];
  });
}

function buildAuthHeaders(config: AiModelConfig): Record<string, string> {
  switch (config.provider) {
    case "gemini":
      return config.apiKey ? { "x-goog-api-key": config.apiKey } : {};
    case "ollama":
      return {};
    case "openai":
    default:
      return config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {};
  }
}

export function createAiGatewayProvider(config: AiModelConfig) {
  return createOpenAICompatible({
    name: config.name,
    baseURL: config.baseURL,
    headers: buildAuthHeaders(config),
  });
}

export function createLovableAiGatewayProvider(lovableApiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}
