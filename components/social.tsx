import Link from "next/link";
import ArrowRightUp from "./common/icons/arrow";

const Social = () => {
    return (
        <div>
            <div className="flex items-center rounded space-x-2 max-w-24 bg-neutral-900 px-3 py-3 flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0 mt-4">
                <div className="flex items-center space-x-2">
                    <Link href="https://github.com/ademcertell" target="_blank" className="flex items-center space-x-2">
                        <ArrowRightUp />
                        <span>GitHub</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Social;