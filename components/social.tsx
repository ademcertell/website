import Link from "next/link";
import ArrowRightUp from "./common/icons/arrow";

const Social = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-4 mt-6">
      <Link
        href="https://www.behance.net/ademcancertel"
        target="_blank"
        className="flex flex-row items-center border border-neutral-500/60 rounded p-3 hover:bg-neutral-800 hover:border-neutral-400/80 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <ArrowRightUp />
        <span className="ml-3 text-white font-semibold">Behance</span>
      </Link>
      <Link
        href="https://medium.com/@ademcertel"
        target="_blank"
        className="flex flex-row items-center border border-neutral-500/60 rounded p-3 hover:bg-neutral-800 hover:border-neutral-400/80 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <ArrowRightUp />
        <span className="ml-3 text-white font-semibold">Medium</span>
      </Link>
      <Link
        href="https://www.youtube.com/@ademcancertel"
        target="_blank"
        className="flex flex-row items-center border border-neutral-500/60 rounded p-3 hover:bg-neutral-800 hover:border-neutral-400/80 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <ArrowRightUp />
        <span className="ml-3 text-white font-semibold">YouTube</span>
      </Link>
      <Link
        href="https://github.com/ademcertell"
        target="_blank"
        className="flex flex-row items-center border border-neutral-500/60 rounded p-3 hover:bg-neutral-800 hover:border-neutral-400/80 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <ArrowRightUp />
        <span className="ml-3 text-white font-semibold">GitHub</span>
      </Link>
    </div>
  );
};

export default Social;
