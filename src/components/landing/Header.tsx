import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { navigation } from "@/constants";
import Avatar from "@/lib/avatar";
import { useScrolled } from "@/lib/use-scrolled";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { siteConfig } from "@/constants";
import { focusRing } from "@/lib/styles";
import { TwitterIcon, GitHubIcon } from "@/components/icons";
import { MenuIcon } from "lucide-react";

import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Header() {
  const { scrolled } = useScrolled({ initial: false });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 rounded-md max-md:border-b max-md:bg-white  md:h-16",
        scrolled && "pointer-events-none"
      )}
    >
      <div className="max-w-[1280px] flex h-full mx-auto w-full  items-center px-3">
        {/* Desktop Nav */}
        <div className="hidden w-full items-center justify-between md:flex">
          <div className="w-[130px]">
            <Link
              to="/"
              className={cn(
                focusRing(),
                "flex items-center space-x-2 rounded opacity-100 transition-[opacity,transform] duration-300 ease-out",
                scrolled && "pointer-events-none -translate-x-2 opacity-0"
              )}
              aria-hidden={scrolled}
            >
              <Avatar
                src={siteConfig.global.logo}
                alt={siteConfig.global.name}
                loading="lazy"
                width={24}
                height={24}
                className="size-6 rounded-sm"
              />
              <div className="mt-1 text-base whitespace-nowrap font-bold ">
                {siteConfig.global.name}
              </div>
            </Link>
          </div>
          <div
            className={cn(
              "relative flex items-center gap-6 overflow-hidden rounded-md bg-white px-4 py-1 transition-[padding,background-color] duration-300 ease-out, ",
              scrolled &&
                "pointer-events-auto bg-[#F4F4F5] pl-14 py-2 shadow-md"
            )}
          >
            <Link
              to="/"
              className={cn(
                focusRing(),
                "pointer-events-none absolute -translate-x-14 rounded opacity-0 transition-[opacity,transform] duration-300 ease-out",
                scrolled && "-translate-x-10 opacity-100"
              )}
              aria-hidden={!scrolled}
              tabIndex={scrolled ? undefined : -1}
            >
              <img
                src={siteConfig.global.logo}
                alt={siteConfig.global.name}
                loading="lazy"
                width={20}
                height={20}
                className="size-5 rounded-sm"
              />
            </Link>

            <Nav items={navigation} />
          </div>

          <div
            className={cn(
              "flex w-[130px] items-center justify-end space-x-2 opacity-100 transition-[opacity,transform] duration-300 ease-out",
              scrolled && "pointer-events-none translate-x-2 opacity-0"
            )}
            aria-hidden={scrolled}
            tabIndex={scrolled ? -1 : undefined}
          >
            <Button variant="ghost" size="icon" className="size-9">
              <GitHubIcon className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="size-9">
              <TwitterIcon className="size-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex w-full  justify-between items-center gap-4 md:hidden">
          <Link
            to="/"
            className={cn(
              focusRing(),
              "flex w-[130px] items-center space-x-2 rounded transition-opacity hover:opacity-80"
            )}
          >
            <img
              src={siteConfig.global.logo}
              alt={siteConfig.global.name}
              loading="lazy"
              width={24}
              height={24}
            />
            <div className="mt-1  font-bold ">{siteConfig.global.name}</div>
          </Link>

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9">
                <MenuIcon className="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col px-4 py-6">
                <Nav
                  items={navigation}
                  direction="col"
                  onNavItemClick={handleDrawerClose}
                />
                <div className="mt-8 flex items-center justify-center gap-4">
                  <Button variant="ghost" size="icon" className="size-10">
                    <GitHubIcon className="size-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-10">
                    <TwitterIcon className="size-5" />
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

interface NavItem {
  name: string;
  url?: string;
}

interface NavProps {
  items: NavItem[];
  direction?: "col" | "row";
  onNavItemClick?: () => void;
}

const Nav = (props: NavProps) => {
  const { items, direction = "row", onNavItemClick } = props;
  const pathname = useLocation().pathname;

  return (
    <nav
      className={cn("flex items-center gap-0 sm:gap-2", {
        "flex-col gap-2 ": direction === "col",
      })}
    >
      {items.map(
        (item, index) =>
          item.url && (
            <a
              className={cn(
                focusRing(),
                "flex items-center justify-center gap-2 rounded px-4 py-1 text-sm font-medium text-fg/60 transition-colors hover:text-fg",
                pathname.startsWith(item.url) &&
                  item.url !== "/" &&
                  "bg-bg-inverse/10 text-fg",
                direction === "col" && "text-md w-full py-2"
              )}
              href={item.url}
              key={index}
              onClick={onNavItemClick}
            >
              {item.url === "/" && (
                <img
                  src={siteConfig.global.logo}
                  alt={siteConfig.global.name}
                  loading="lazy"
                  width={24}
                  height={24}
                />
              )}
              <span>{item.name}</span>
            </a>
          )
      )}
    </nav>
  );
};
