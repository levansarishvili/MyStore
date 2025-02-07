// Blog item component
import { Button } from "../../../components/ui/button";
import { Link } from "../../../../i18n/routing";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";

interface Props {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  locale: string;
}
export default function BlogItem({
  id,
  title,
  content,
  image_url,
  locale,
}: Props) {
  const t = useTranslations("Blogs.BlogItem");

  return (
    <li className="relative min-w-[16rem] flex flex-col items-start gap-6 rounded-2xl transition-all duration-300  bg-card border hover:shadow-md">
      <div className="w-full flex flex-col items-center justify-between gap-4 h-full">
        {/* Image with fallback */}
        <div className="w-full h-40 lg:h-52 overflow-hidden rounded-lg">
          <Image
            src={image_url || "/placeholder.png"}
            alt={title}
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full flex flex-col gap-4 px-4 md:px-6 py-4 justify-between h-52 md:h-60">
          <h2 className="text-base lg:text-lg font-medium">{title}</h2>
          <div className="text-sm text-muted-foreground line-clamp-3 text-start">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          <div className="w-full flex justify-center">
            <Link href={`/blog/${id}`}>
              <Button
                variant="default"
                className=" bg-[#38cb89] text-white hover:bg-[#2ca76e] transition-all duration-300"
              >
                {t("readMore")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
