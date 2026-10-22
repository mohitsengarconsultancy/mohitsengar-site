/** Shared facts for the single Person node (root layout) and pages that reference it. */
export const SITE_URL = "https://www.mohitsengar.org";
export const PERSON_ID = `${SITE_URL}/#person`;
export const PERSON_NAME = "Mohit Singh Sengar";

export const PERSON_SAME_AS = [
  "https://www.linkedin.com/in/mohitsengarr/",
  "https://www.youtube.com/@mohitsengarr",
  "https://www.instagram.com/mohitsengarr/",
  "https://github.com/mohitsengarconsultancy",
  "https://sengarconsultancy.org",
];

/** Use wherever a schema needs the author/publisher: @id plus name and url, so it reads on its own. */
export const PERSON_REF = { "@type": "Person", "@id": PERSON_ID, name: PERSON_NAME, url: SITE_URL };
