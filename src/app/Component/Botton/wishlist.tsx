"use client";

import { IBook } from "@/Ibook.type";
import React, { useContext } from "react";
import { Cardcontextbooks } from "../context/Cradcontext";
import { toast } from "react-toastify";


const Wishlist = ({ book }: { book: IBook }) => {
  const context = useContext(Cardcontextbooks);

  if (!context) {
    return null;
  }

  const { wishlist, setWishlist } = context;

const handleWishlist = () => {
  setWishlist([...wishlist, book]);

  toast.success(`${book.bookName} added to Wishlist!`);
};
  return (
    <button
      className="btn btn-primary flex-1"
      onClick={handleWishlist}
    >
      Add to Wishlist
    </button>
  );
};

export default Wishlist;

