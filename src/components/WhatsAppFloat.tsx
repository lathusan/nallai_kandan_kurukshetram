import { whatsappLink } from "./whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hello, I would like to ask about mridangam classes.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-[#1f8f4e] px-4 py-3 text-white shadow-lg shadow-black/20 hover:bg-[#187a42]"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
      <span className="sr-only sm:hidden">Chat on WhatsApp</span>
    </a>
  );
}
