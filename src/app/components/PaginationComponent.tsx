import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export default function PaginationComponent({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <Pagination className="mt-12 md:mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${page === 1 && "pointer-events-none opacity-60"}`}
            href={`?page=${page > 1 ? page - 1 : 1}`}
          />
        </PaginationItem>
        <PaginationItem
          className={`${page === 1 && "opacity-0 pointer-events-none"}`}
        >
          <PaginationLink href={`?page=${page === 1 ? 1 : page - 1}`}>
            {page === 1 ? 1 : page - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`?page=${page}`}
            isActive
            className="pointer-events-none bg-primary text-white hover:bg-[#2ca76e] hover:text-white transition-all duration-200"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={`${
            page === totalPages && "opacity-0 pointer-events-none"
          }`}
        >
          <PaginationLink
            href={`?page=${page === totalPages ? page : page + 1}`}
          >
            {page === totalPages ? page : page + 1}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className={`${
              page === totalPages && "pointer-events-none opacity-60"
            }`}
            href={`?page=${page < totalPages ? page + 1 : page}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
