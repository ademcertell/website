import { Metadata } from "next";

import { Book } from "@/components/mores/latest-books";
import { booksData } from "./book";

export const metadata: Metadata = {
  title: "Books",
  description: "The page where I share the books I read.",
};

const booksPage = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Books</h1>
      <p className="mb-6">
        As a person who loves to read, I share the books I have finished and the
        books I am currently reading. I usually prefer reading books in the
        genres of history, self-development, and novels, but I also occasionally
        enjoy reading graphic novels.
      </p>
      {booksData.map(
        (book) => book.readingNow && <Book key={book.url} {...book} />
      )}
      <p className="mt-6 ">Books I finished</p>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        {booksData.map(
          (book) => !book.readingNow && <Book key={book.url} {...book} />
        )}
      </div>
    </section>
  );
};

export default booksPage;
