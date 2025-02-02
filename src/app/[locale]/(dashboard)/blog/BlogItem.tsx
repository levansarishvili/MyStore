// Blog item component
import { Button } from "../../../components/ui/button";
import { Link } from "../../../../i18n/routing";

interface Props {
  id: number;
  title: string;
  content: string;
}
export default function BlogItem({ id, title, content }: Props) {
  return (
    <li className="relative max-w-[45rem] flex flex-col items-start gap-8 p-8 rounded-2xl transition-all duration-300 cursor-pointer h-[30rem] hover:shadow-md">
      <div className="w-full p-x-8 py-0 flex flex-col justify-between items-center gap-12 h-full">
        <h2 className="text-3xlfont-semibold">{title}</h2>
        <p className="text-[1.4rem] line-clamp-3 text-start">{content}</p>
        <div className="flex gap-4">
          <Link className="max-w-60" href={`/blog/${id}`}>
            <Button
              variant="default"
              className="w-full flex justify-center"
              name="Read more"
            />
          </Link>
        </div>
      </div>
    </li>
  );
}
