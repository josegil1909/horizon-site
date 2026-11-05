import { HomePage } from "@/components/home-page";
import { HOME_LANGUAGES, pageMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/components/site";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  languages: HOME_LANGUAGES,
});

export default function Home() {
  return <HomePage locale="en" />;
}
