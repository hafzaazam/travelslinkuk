import { MessageCircle } from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";

const WHATSAPP_MESSAGE =
  "Hi Travel Links Solution, I'm interested in a visa consultation. Can you help?";

export function WhatsAppButton() {
  const { whatsapp_e164 } = useContactInfo();
  return (
    <a
      href={`https://wa.me/${whatsapp_e164}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Travel Links on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-whatsapp opacity-60 animate-ping" aria-hidden="true" />
        <MessageCircle className="relative h-5 w-5" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
