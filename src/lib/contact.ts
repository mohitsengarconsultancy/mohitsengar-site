/**
 * Single source of truth for contact paths used across the site.
 * Points straight at the 30-minute event (the only one on the account), so
 * visitors skip the "pick an event" page. Rename the event in Calendly to
 * "Free 30-min fit call" so it matches the site copy.
 */
export const CALENDLY_URL = "https://calendly.com/mohitsengarr/30min";
export const CONTACT_EMAIL = "mohit@sengarconsultancy.org";

/**
 * WhatsApp number in international format, digits only (e.g. "9715XXXXXXXX").
 * Leave empty to hide every WhatsApp link on the site.
 */
export const WHATSAPP_NUMBER = "";

export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi Mohit, I found you via mohitsengar.org and would like to talk about my product."
    )}`
  : "";
