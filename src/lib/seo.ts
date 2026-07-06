export const SITE_NAME = "Beyond the Canvas Art Studio";
export const SITE_URL = "https://farnazartstudio.com";
export const DEFAULT_DESCRIPTION =
  "A luxury art studio in Los Angeles led by Iranian-American artist Farnaz Amin. Oil painting, watercolor, resin art, private classes, and events for all ages.";

export const SOCIAL_IMAGE_PATH = "/images/logo-v-main.svg";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
