import { About } from "@/components/about";
import { Community } from "@/components/community";
import { Contributors } from "@/components/contributors";
import { Gallery } from "@/components/gallery";
import { getReleases } from "@/components/github-releases";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { DOWNLOAD_URL, GITHUB_URL } from "@/components/links";
import { Parity } from "@/components/parity";
import {
  absolute,
  ALTERNATE_NAMES,
  APP_ID,
  AUTHOR,
  OPERATING_SYSTEMS,
  ORGANIZATION_ID,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/components/site";
import { Sponsor } from "@/components/sponsor";
import { type Locale, getDictionary } from "@/lib/i18n";

const SCREENSHOTS = ["/media/nether.webp", "/media/village-800.webp", "/media/night-800.webp", "/media/underwater.webp"];

export async function HomePage({ locale = "en" }: { locale?: Locale }) {
  const releases = await getReleases();
  const game = releases?.find((r) => r.kind === "horizon");
  const isSpanish = locale === "es";
  const dict = getDictionary(locale);

  return (
    <main lang={locale}>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "WebSite",
              "@id": WEBSITE_ID,
              url: isSpanish ? `${SITE_URL}/es` : SITE_URL,
              name: SITE_NAME,
              alternateName: ALTERNATE_NAMES,
              description: dict.jsonLd.websiteDescription,
              inLanguage: locale,
              publisher: { "@id": ORGANIZATION_ID },
            },
            {
              "@type": "Organization",
              "@id": ORGANIZATION_ID,
              name: SITE_NAME,
              url: SITE_URL,
              logo: absolute("/icon-512.png"),
              founder: AUTHOR,
              sameAs: SAME_AS,
            },
            {
              "@type": "SoftwareApplication",
              "@id": APP_ID,
              name: SITE_NAME,
              alternateName: ALTERNATE_NAMES,
              description: dict.jsonLd.appDescription,
              url: isSpanish ? `${SITE_URL}/es` : SITE_URL,
              applicationCategory: "GameApplication",
              applicationSubCategory: "Minecraft: Java Edition client",
              operatingSystem: OPERATING_SYSTEMS,
              softwareVersion: game?.tag.replace(/^\D+/, ""),
              softwareRequirements: dict.jsonLd.softwareRequirements,
              downloadUrl: absolute(DOWNLOAD_URL),
              releaseNotes: absolute("/releases"),
              screenshot: SCREENSHOTS.map(absolute),
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              isAccessibleForFree: true,
              license: "https://opensource.org/license/mit",
              author: AUTHOR,
              publisher: { "@id": ORGANIZATION_ID },
              sameAs: [GITHUB_URL],
            },
          ],
        }}
      />
      <Hero locale={locale} />
      <About locale={locale} />
      <Sponsor lang={isSpanish ? "en" : undefined} />
      <Community locale={locale} />
      <Gallery locale={locale} />
      <Contributors lang={isSpanish ? "en" : undefined} />
      <Parity lang={isSpanish ? "en" : undefined} />
    </main>
  );
}
