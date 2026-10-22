import { WHATSAPP_URL } from "@/lib/contact";

/** Click-to-chat link. Renders nothing until WHATSAPP_NUMBER is set in src/lib/contact.ts. */
export default function WhatsAppLink({
  className = "",
  label = "Chat on WhatsApp",
}: {
  className?: string;
  label?: string;
}) {
  if (!WHATSAPP_URL) return null;
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
}
