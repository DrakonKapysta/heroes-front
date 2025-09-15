import { cn } from "@/lib/utils";
import type { Hero } from "@/types";
import type { ComponentPropsWithoutRef, FC } from "react";
import { HeroCard } from "./HeroCard";

interface HeroListProps extends ComponentPropsWithoutRef<"div"> {
  heroes: Hero[];
}

export const HeroList: FC<HeroListProps> = ({ heroes, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-2",
        className
      )}
    >
      {heroes.map((hero) => (
        <HeroCard key={hero.id} hero={hero} className="" />
      ))}
    </div>
  );
};
