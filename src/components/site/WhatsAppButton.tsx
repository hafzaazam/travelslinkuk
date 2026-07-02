import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "447879465341";
const WHATSAPP_MESSAGE =
  "Hi Travel Links Solution, I'm interested in a visa consultation. Can you help?";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Travel Links on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-whatsapp opacity-60 animate-ping" aria-hidden="true" />
        <MessageCircle className="relative h-5 w-5" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
