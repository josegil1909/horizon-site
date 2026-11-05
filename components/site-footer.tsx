"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { GitHubIcon, HorizonMark, MicrosoftIcon, MojangIcon, RustIcon } from "@/components/icons";
import { GITHUB_URL } from "@/components/links";
import { getDictionary } from "@/lib/i18n";

const GITHUB_PRIVACY_URL = "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement";

function Out({ href, children, srText = "(opens in a new tab)" }: { href: string; children: ReactNode; srText?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
    >
      {children}
      <span className="sr-only"> {srText}</span>
    </a>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-medium text-white/80">{children}</h2>;
}

export function SiteFooter() {
  return (
    <Suspense fallback={<SiteFooterView pathname="" />}>
      <SiteFooterAtPath />
    </Suspense>
  );
}

function SiteFooterAtPath() {
  return <SiteFooterView pathname={usePathname()} />;
}

function SiteFooterView({ pathname }: { pathname: string }) {
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const isHome = pathname === "" || pathname === "/" || pathname === "/es";
  const dict = getDictionary(isSpanish ? "es" : "en");
  const srText = dict.footer.opensInNewTab;

  const legal = [
    { href: "/privacy", label: dict.footer.privacyPolicy },
    { href: "/terms", label: dict.footer.termsOfSale },
    { href: "/refunds", label: dict.footer.refunds },
    { href: "/shop", label: dict.footer.shop },
  ];

  return (
    <footer lang={isSpanish ? "es" : "en"} className="mt-auto border-t border-white/[0.08]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-16">
          <Link href={isSpanish ? "/es" : "/"} className="flex shrink-0 items-center gap-2 text-white">
            <HorizonMark className="size-8" />
            <span className="font-display text-[19px] font-semibold tracking-[-0.02em]">Horizon</span>
          </Link>
          <div className="flex max-w-xl items-center gap-4 md:flex-row-reverse md:text-right">
            <p className="text-[15px] leading-relaxed font-medium text-pretty text-white/80">
              {dict.footer.disclaimer}
            </p>
            <span className="flex shrink-0 items-center gap-3 text-white/45">
              <MojangIcon className="size-6" />
              <MicrosoftIcon className="size-5" />
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-10 text-sm leading-relaxed text-pretty text-white/50 md:grid-cols-3 md:gap-12">
          <div>
            <Heading>{dict.footer.whoMakesItTitle}</Heading>
            <p className="mt-3">
              {dict.footer.whoMakesItPart1} <Out href="https://lu4ovic.com" srText={srText}>lu4ovic.com</Out>. {dict.footer.whoMakesItPart2}{" "}
              <Out href="https://dezerx.com" srText={srText}>DezerX</Out>
              {dict.footer.whoMakesItPart3}
            </p>
          </div>
          <div>
            <Heading>{dict.footer.licencesTitle}</Heading>
            <p className="mt-3">
              {dict.footer.licencesPart1} <Out href={`${GITHUB_URL}/blob/main/LICENSE`} srText={srText}>{dict.footer.mitLicence}</Out>
              {dict.footer.licencesPart2}{" "}
              <Out href="https://openfontlicense.org" srText={srText}>{dict.footer.silLicence}</Out>
              {dict.footer.licencesPart3}
            </p>
          </div>
          <div>
            <Heading>{dict.footer.privacyTitle}</Heading>
            <p className="mt-3">
              {dict.footer.privacyPart1}{" "}
              <Out href={GITHUB_PRIVACY_URL} srText={srText}>{dict.footer.githubPrivacy}</Out>{" "}
              {dict.footer.privacyPart2}{" "}
              <Out href={`${GITHUB_URL}/blob/main/docs/telemetry.md`} srText={srText}>{dict.footer.telemetryLink}</Out>.
            </p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {legal.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-medium text-white/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                >
                  {label}
                </Link>
              ))}
              {isHome && (
                <Link
                  href={isSpanish ? "/" : "/es"}
                  hrefLang={isSpanish ? "en" : "es"}
                  className="font-medium text-white/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                >
                  {dict.footer.languageSwitch}
                </Link>
              )}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            {dict.footer.madeInOpen}
            <RustIcon className="size-4" />
          </p>
          <a href={GITHUB_URL} lang="en" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <GitHubIcon className="size-4" />
            {GITHUB_URL.replace("https://github.com/", "")}
          </a>
        </div>
      </div>
    </footer>
  );
}
