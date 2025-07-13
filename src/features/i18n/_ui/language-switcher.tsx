"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import {
  Button,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenu,
} from "@/shared/ui";
import { Locale } from "@/shared/types/language";

export const LanguageSwitcher = () => {
  const t = useTranslations("LanguageSwitcher");
  const router = useRouter();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const availableLanguages: { locale: Locale; name: string }[] = [
    { locale: "en", name: "English" },
    { locale: "sr", name: "Srpski" },
    { locale: "ru", name: "Русский" },
  ];

  const changeLanguage = (newLocale: Locale) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);

    router.replace(`${newPathname}?${searchParams.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-1 text-white hover:bg-gray-800 hover:text-white uppercase"
        >
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>{t("selectLanguage")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(newLocale) => changeLanguage(newLocale as Locale)}
        >
          {availableLanguages.map((lang) => (
            <DropdownMenuRadioItem key={lang.locale} value={lang.locale}>
              <Image
                width={25}
                height={25}
                alt={`Language ${lang.name}`}
                src={`/flags/${lang.locale}.svg`}
                className="mr-2 inline-block"
              />
              {lang.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
