import ReadBooks from "@/app/Component/Botton/ReadBooks";
import Wishlist from "@/app/Component/Botton/wishlist";
import { IBook } from "@/Ibook.type";
import Image from "next/image";
import React from "react";

interface IBookDetailsPageProps {
  params: Promise<{
    bookId: string;
  }>;
}

const getBooks = async (): Promise<IBook[]> => {
  try {
    const response = await fetch(
      "http://localhost:3000/booksData.json",
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
};

const BookDetailsPage = async ({ params }: IBookDetailsPageProps) => {
  const { id } = await params;

  const booksData = await getBooks();

  const book = booksData.find(
    (book: IBook) => String(book.bookId) === String(id),
  );

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Book not found</h1>
        <p className="mt-2 text-gray-500">
          The book you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-xl lg:card-side">
        {/* Book Image */}
        <figure className="relative bg-base-200 lg:w-2/5">
          <Image
            src={book.image}
            alt={book.bookName}
            width={500}
            height={700}
            className="h-full min-h-[400px] w-full object-cover lg:min-h-[550px]"
          />
        </figure>

        {/* Book Details */}
        <div className="card-body justify-center lg:w-3/5 lg:p-10">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-primary badge-outline">
              {book.category}
            </span>

            {book.tags.map((tag) => (
              <span key={tag} className="badge badge-ghost">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
            {book.bookName}
          </h1>

          {/* Author */}
          <p className="text-lg text-base-content/60">
            by{" "}
            <span className="font-semibold text-base-content">
              {book.author}
            </span>
          </p>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-3">
            <div className="rating rating-sm">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name={`rating-${book.bookId}`}
                  className="mask mask-star-2 bg-orange-400"
                  checked={Math.round(book.rating) === star}
                  readOnly
                />
              ))}
            </div>

            <span className="font-semibold">{book.rating}</span>

            <span className="text-sm text-base-content/50">/ 5.0</span>
          </div>

          {/* Review */}
          <div className="mt-5">
            <h3 className="mb-2 text-lg font-bold">About this book</h3>

            <p className="leading-7 text-base-content/70">
              {book.review}
            </p>
          </div>

          {/* Book Information */}
          <div className="my-6 grid grid-cols-2 gap-3 rounded-2xl bg-base-200 p-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-base-content/50">Pages</p>
              <p className="mt-1 font-bold">{book.totalPages}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Published</p>
              <p className="mt-1 font-bold">{book.yearOfPublishing}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Publisher</p>
              <p className="mt-1 font-bold">{book.publisher}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Rating</p>
              <p className="mt-1 font-bold">⭐ {book.rating}</p>
            </div>
          </div>
           <div className="card-actions mt-2">
            <ReadBooks book={book}/>
            <Wishlist book={book}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;