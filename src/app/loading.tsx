import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <span className="loading loading-spinner loading-lg text-primary"></span>

      <div className="text-center">
        <h1 className="text-2xl font-bold md:text-3xl">
          Loading...
        </h1>

        <p className="mt-2 text-sm text-base-content/60">
          Please wait while we load the books.
        </p>
      </div>
    </div>
  );
};

export default Loading;