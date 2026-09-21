"use client";

import React, { useContext, useState} from "react";
import { Cardcontextbooks } from "../Component/context/Cradcontext";
import BookCard from "../Component/shared/BookCard";
import { IBook } from "@/Ibook.type";

const BookPage = () => {
    const context = useContext(Cardcontextbooks);

    if (!context) {
        return null;
    }

    const { ReadBooks, wishlist } = context;
    const [sortOption, setSortOption] = useState<"rating" | "pages" | "year">("rating");
   const SortBooks = (books: IBook[]) => {
  const sortedBooks = [...books];

  if (sortOption === "rating") {
    sortedBooks.sort((a, b) => b.rating - a.rating);
  }

  if (sortOption === "pages") {
    sortedBooks.sort((a, b) => b.totalPages - a.totalPages);
  }

  if (sortOption === "year") {
    sortedBooks.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
  }

  return sortedBooks;
};
    

    const ReadSortbooks=SortBooks(ReadBooks);
     const wishlistSortbooks= SortBooks(wishlist);
    return (
        <div className="container mx-auto px-4 py-10">

            <h2 className="my-4 bg-amber-100 rounded-3xl py-16 font-bold text-4xl text-center">
                Listed Books
            </h2>

            <div className=" flex items-center justify-center ">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as "rating" | "pages" | "year")}
                     className="select select-primary w-56 rounded-xl border-2 bg-base-100 text-base font-semibold shadow-md transition hover:shadow-lg focus:outline-none"
                >
                    <option disabled={true}>Sort By</option>
                    <option value="rating">rating</option>
                    <option value="pages">Number of Pages</option>
                    <option value="year">Publication Year</option>
                </select>
            </div>



            {/* Tabs */}
            <div className="tabs tabs-lift">

                {/* Read Books Tab */}
                <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label={`Read Books (${ReadBooks.length})`}
                    defaultChecked
                />

                <div className="tab-content bg-base-100 border-base-300 p-6">

                    {ReadSortbooks.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {ReadSortbooks.map((book: IBook) => {
                                return (
                                    <BookCard
                                        key={book.bookId}
                                        book={book}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-lg font-semibold">
                            No read books found
                        </p>
                    )}

                </div>

                {/* Wishlist Tab */}
                <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label={`Wishlist (${wishlist.length})`}
                />

                <div className="tab-content bg-base-100 border-base-300 p-6">

                    {wishlistSortbooks.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {wishlistSortbooks.map((book: IBook) => {
                                return (
                                    <BookCard
                                        key={book.bookId}
                                        book={book}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-lg font-semibold">
                            No wishlist books found
                        </p>
                    )}

                </div>

            </div>
        </div>
    );
};

export default BookPage;