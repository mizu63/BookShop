
"use client";

import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Label,
  Tooltip,
  type BarShapeProps,
  type LabelProps,
} from "recharts";

import { Cardcontextbooks } from "../Component/context/Cradcontext";
import { IBook } from "@/Ibook.type";

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "black",
];

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return `M${x},${y + height}
    C${x + width / 3},${y + height}
    ${x + width / 2},${y + height / 3}
    ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3}
    ${x + (2 * width) / 3},${y + height}
    ${x + width},${y + height}
    Z`;
};

const TriangleBar = (props: BarShapeProps) => {
  const { x, y, width, height, index } = props;

  const color = colors[(index ?? 0) % colors.length];

  return (
    <path
      d={getPath(
        Number(x),
        Number(y),
        Number(width),
        Number(height)
      )}
      fill={color}
      stroke={color}
      strokeWidth={props.isActive ? 5 : 0}
    />
  );
};

const CustomColorLabel = (props: LabelProps) => {
  const fill = colors[(props.index ?? 0) % colors.length];

  return <Label {...props} fill={fill} />;
};

const ReadbooksPage = () => {
  const { ReadBooks } = useContext(Cardcontextbooks);

  const data = ReadBooks.map((book: IBook) => ({
    name: book.bookName,
    rating: book.rating,
    author: book.author,
    totalPages: book.totalPages,
    category: book.category,
    year: book.yearOfPublishing,
    publisher: book.publisher,
  }));

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Read Books Statistics
          </h1>

          <p className="mt-2 text-gray-500">
            Your reading activity overview
          </p>
        </div>

        {/* Chart */}
        <div className="overflow-x-auto rounded-2xl bg-white p-5 shadow-md">
       {ReadBooks.length > 0 ?    <BarChart
            style={{
              width: "100%",
              minWidth: "700px",
              height: "400px",
              margin: "0 auto",
            }}
            responsive
            data={data}
            margin={{
              top: 30,
              right: 20,
              left: 10,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={100}
            />

            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
            />

            <Tooltip
              formatter={(value, name, item) => {
                if (name === "rating") {
                  return [
                    `${value} ⭐`,
                    "Rating",
                  ];
                }

                return [value, name];
              }}
              labelFormatter={(label) => `Book: ${label}`}
            />

            <Bar
              dataKey="rating"
              shape={TriangleBar}
              activeBar
            >
              <LabelList
                content={CustomColorLabel}
                position="top"
              />
            </Bar>
          </BarChart> : <p className="text-center text-gray-500">No read books available.</p>}
        </div>
      </div>
    </div>
  );
};

export default ReadbooksPage;

