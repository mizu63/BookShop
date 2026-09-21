"use client";
import { IBook } from "@/Ibook.type";
import React, { createContext, useState } from "react";

interface ICardContext {
  ReadBooks: IBook[];
  setReadBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  wishlist: IBook[];
  setWishlist: React.Dispatch<React.SetStateAction<IBook[]>>;
}

export const Cardcontextbooks = createContext<ICardContext | undefined>(
  undefined
);

const Cardcontext = ({ children }: { children: React.ReactNode }) => {
  const [ReadBooks, setReadBooks] = useState<IBook[]>([]);
  const [wishlist, setWishlist] = useState<IBook[]>([]);

  const total = {
    ReadBooks,
    setReadBooks,
    wishlist,
    setWishlist,
  };

  return (
    <Cardcontextbooks.Provider value={total}>
      {children}
    </Cardcontextbooks.Provider>
  );
};

export default Cardcontext;;