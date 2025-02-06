import Link from "next/link";
import { signup } from "./actions";
import { useTranslations } from "next-intl";
import { Button } from "src/app/components/ui/button";

interface paramsType {
  params: { locale: string };
  locale: string;
}

export default function LoginPage({ params }: paramsType) {
  const locale = params.locale;
  const t = useTranslations("SignUpPage");

  return (
    <div className="mt-16 bg-card flex flex-col items-center gap-6 justify-center border max-w-[24rem] mx-auto rounded-xl px-6 md:px-8 py-8 shadow-md">
      <form className="flex flex-col items-center gap-8 lg:gap-10 justify-center max-w-[24rem] mx-auto">
        <h1 className="text-xl md:text-2xl font-medium">{t("title")}</h1>
        <div className="flex">
          <p className="text-xs sm:text-sm lg:text-base">
            {t("question")} &nbsp;
          </p>
          <Link
            href={`/${locale}/login`}
            className="text-primary text-xs sm:text-sm lg:text-base"
          >
            {t("link")}
          </Link>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 min-w-[16rem]">
            <label className="text-xs sm:text-sm lg:text-base" htmlFor="email">
              {t("email")}:
            </label>
            <input
              className="border rounded-lg px-4 py-2 text-sm bg-background"
              id="email"
              name="email"
              type="email"
              data-cy="email-input"
              // required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-xs sm:text-sm lg:text-base"
              htmlFor="password"
            >
              {t("password")}:
            </label>
            <input
              className="border rounded-lg px-4 py-2 text-sm bg-background"
              id="password"
              name="password"
              type="password"
              data-cy="password-input"
              // required
            />
          </div>
        </div>
        <div className="w-2/3">
          <Button
            formAction={signup}
            variant={"default"}
            className="text-foreground hover:bg-[#38cb89]/80 transition-all duration-300 w-full"
            data-cy="signup-button"
          >
            {t("signup-button")}
          </Button>
        </div>
      </form>
    </div>
  );
}
