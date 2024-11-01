// Blog item component
import Button from "../../components/buttons/Button";
import Link from "next/link";
import DeleteButton from "../../components/buttons/DeleteButton";
import EditButton from "../../components/buttons/EditButton";
export default function BlogItem({
  id,
  title,
  content,
  views,
  onDelete,
  onEdit,
}) {
  return (
    <li className="blog__list__item dark:bg-[#313131] relative max-w-[45rem] flex flex-col items-start gap-8 border p-8 rounded-2xl transition-all duration-300 cursor-pointer h-[30rem] hover:shadow-md hover:bg-[#ec5e2a22]">
      <div className="blog__content w-full p-x-8 py-0 flex flex-col justify-between items-center gap-12 h-full">
        <h2 className="blog__title dark:text-[#f8f9fa] text-3xl text-gray-700 font-semibold">
          {title}
        </h2>
        <p className="blog__txt text-[1.4rem] line-clamp-3 text-start">
          {content}
        </p>
        <div className="blog__views-wrapper flex items-center gap-4">
          <svg
            className="post-icon blog-page w-8 h-8 fill-[#ec5e2a]"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
          </svg>
          <span className="blog__views text-[1.4rem] font-medium">{views}</span>
        </div>
        <div className="buttons flex gap-4">
          <Link className="blog__link max-w-60" href={`/blog/${id}`}>
            <Button
              className="btn blog-btn w-full flex justify-center"
              name="Read more"
            />
          </Link>
          <EditButton onEdit={onEdit} id={id} />
          <DeleteButton onDelete={onDelete} />
        </div>
      </div>
    </li>
  );
}
