import { IBook } from "@/Ibook.type";
import Image from "next/image";
import Link from "next/link";

interface IBookCardProps {
  book: IBook;
}

const BookCard = ({ book }: IBookCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-72 overflow-hidden bg-slate-100">
        <Image
          src={book.image}
          alt={book.bookName}
          width={800}
          height={600}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          {book.category}
        </span>

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-sm font-medium text-white backdrop-blur">
          <span className="text-yellow-400">★</span>
          {book.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Book Name */}
        <h3 className="line-clamp-1 text-xl font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
          {book.bookName}
        </h3>

        {/* Author */}
        <p className="mt-1 text-sm text-slate-500">
          by <span className="font-medium text-slate-700">{book.author}</span>
        </p>

        {/* Details */}
        <div className="my-5 flex items-center justify-between border-y border-slate-100 py-3 text-sm text-slate-500">
          <div>
            <p className="text-xs text-slate-400">Pages</p>
            <p className="font-semibold text-slate-700">
              {book.totalPages}
            </p>
          </div>

          <div className="h-8 w-px bg-slate-200"></div>

          <div>
            <p className="text-xs text-slate-400">Published</p>
            <p className="font-semibold text-slate-700">
              {book.yearOfPublishing}
            </p>
          </div>

          <div className="h-8 w-px bg-slate-200"></div>

          <div>
            <p className="text-xs text-slate-400">Publisher</p>
            <p className="max-w-[90px] truncate font-semibold text-slate-700">
              {book.publisher}
            </p>
          </div>
        </div>

        {/* Button */}
    <Link
  href={`/books/${book.bookId}`}
  className="btn w-full rounded-xl border-0 bg-slate-900 text-white transition-all hover:bg-emerald-600"
>
  View Details →
</Link>
      </div>
    </div>
  );
};

export default BookCard;