import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { LINA_PERSONA } from "@/lib/lina-persona";

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [{ type: "text", text: LINA_PERSONA.intro }],
};

const STORAGE_KEY = "tls-chat-history-v1";

function loadInitialMessages(): UIMessage[] {
  if (typeof window === "undefined") return [WELCOME];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw) as UIMessage[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialMessages = useRef<UIMessage[]>(loadInitialMessages()).current;

  const { messages, sendMessage, status, error, setMessages } = useChat({
    id: "travel-links-consultant",
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: import.meta.env.VITE_CHAT_API_URL || "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Persist messages to localStorage whenever they change (and stream settles)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status === "streaming" || status === "submitted") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota / serialization errors
    }
  }, [messages, status]);

  const clearHistory = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setMessages([WELCOME]);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, status]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat with Lina"}
        className={cn(
          "fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105",
          open && "rotate-90",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[60] flex h-[560px] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary to-primary/80 px-4 py-3 text-primary-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg font-semibold">
              L
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Lina · Visa Consultant</div>
              <div className="flex items-center gap-1.5 text-xs opacity-90">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online · replies instantly
              </div>
            </div>
            <button
              onClick={clearHistory}
              className="rounded-md px-2 py-1 text-xs font-medium opacity-80 transition hover:bg-white/15 hover:opacity-100"
              aria-label="Clear conversation history"
              title="Clear conversation"
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 px-3 py-4">
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={cn("flex", isUser ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                      isUser
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-background text-foreground shadow-sm",
                    )}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{text}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none text-foreground [&_a]:text-primary [&_p]:my-1 [&_ul]:my-1 [&_ul]:pl-4">
                        <ReactMarkdown>{text || "…"}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-background px-3.5 py-2.5 text-sm text-muted-foreground shadow-sm">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Lina is typing…
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                Sorry, I couldn't reach the AI service. Please try again.
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={onSubmit}
            className="flex items-end gap-2 border-t border-border bg-background p-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void onSubmit(e as unknown as FormEvent);
                }
              }}
              placeholder="Ask about a visa…"
              rows={1}
              className="max-h-32 min-h-[40px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
