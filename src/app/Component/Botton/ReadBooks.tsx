"use client";

import { IBook } from "@/Ibook.type";
import { Cardcontextbooks } from "../context/Cradcontext";
import { useContext } from "react";
import { toast } from "react-toastify";

const ReadBooks = ({ book }: { book: IBook }) => {
  const context = useContext(Cardcontextbooks);

  if (!context) {
    return null;
  }

  const { ReadBooks, setReadBooks } = context;

 const handleReadBook = () => {
  setReadBooks([...ReadBooks, book]);

  toast.success(`${book.bookName} added to Read Books!`);
};

  return (
    <button
      className="btn btn-primary flex-1"
      onClick={handleReadBook}
    >
      Read
    </button>
    
  );
};

export default ReadBooks;