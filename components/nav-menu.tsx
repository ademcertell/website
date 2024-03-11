import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface ListItemProps {
  title: string;
  href: string;
  className?: string;
  listItems?: ListItemProps[];
  children?: React.ReactNode;
}

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="p-0">
          <NavigationMenuTrigger className="font-semibold text-base -mt-25 rounded-full px-3 py-1 hover:bg-black/30 h-auto">
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[150px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[350px] bg-white dark:bg-white text-white">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-md">
                <ListItem title="Books" href="/books" />
              </div>
              <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-md">
                <ListItem title="Music" href="/music" />
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem: React.FC<ListItemProps> = ({ title, href }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};