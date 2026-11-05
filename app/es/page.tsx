import { HomePage } from "@/components/home-page";
import { HOME_LANGUAGES, pageMetadata } from "@/components/site";
import { getDictionary } from "@/lib/i18n";

const dict = getDictionary("es");

export const metadata = pageMetadata({
  title: dict.meta.title,
  description: dict.meta.description,
  path: "/es",
  locale: "es_ES",
  languages: HOME_LANGUAGES,
});

export default function HomeSpanish() {
  return <HomePage locale="es" />;
}
