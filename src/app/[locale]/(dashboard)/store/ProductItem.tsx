import { Link } from "../../../../i18n/routing";
import Image from "next/image";
import Button from "../../../components/buttons/Button";

interface Props {
  id: number;
  name: string;
  imageSrc: string;
  price: number;
}

// Product card component
export default function ProductItem({ id, name, imageSrc, price }: Props) {
  return (
    <div className="product-card dark:bg-[#313131] group flex flex-col items-center justify-between gap-8 cursor-pointer text-center transition-all duration-300 py-8 px-12 w-[28rem] h-[32rem] dark:hover:shadow-md dark:hover:shadow-[#ec5e2a] rounded-2xl hover:shadow-md bg-[#f1f3f5]">
      <Link
        className="product__link flex flex-col justify-center items-center gap-8"
        href={`/store/${id}`}
      >
        {/* <img className="product__img" src={imageSrc} alt="Product"></img> */}
        <div className="product__img-wrapper w-60 h-40 flex justify-center items-center overflow-hidden">
          <Image
            className="product__img object-contain w-40 h-40 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
            src={imageSrc || "/assets/placeholder-img.png"}
            alt={name}
            width={100}
            height={100}
            quality={50}
            priority={true}
          />
        </div>

        <div className="product-card__content flex flex-col gap-6 items-center">
          <h2 className="product__title dark:text-[#f8f9fa] text-2xl text-gray-600 font-semibold">
            {name}
          </h2>
          <div className="product__desc flex flex-col gap-4">
            <div className="product__stock-wrapper flex items-center justify-center gap-4 text-gray-600 text-xl"></div>
            <p className="product__price text-2xl font-medium text-gray-600 dark:text-gray-100">{`${price} $`}</p>
          </div>
        </div>
      </Link>
      <div className="buttons flex gap-4">
        <Button className="btn" name="Add to cart" />
      </div>
    </div>
  );
}
