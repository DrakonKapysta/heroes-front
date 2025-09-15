import { cn } from "@/lib/utils";
import type { Hero } from "@/types";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { Modal } from "../Modal";
import { FullHeroInfo } from "./FullHeroInfo";
import notFoundHeroImage from "/no-hero-image.svg?url";

interface HeroCardProps extends ComponentPropsWithoutRef<"div"> {
  hero: Hero;
}

export const HeroCard: FC<HeroCardProps> = ({ hero, className }) => {
  const [isHeroShowing, setIsHeroShowing] = useState(false);
  return (
    <div
      onClick={() => setIsHeroShowing(true)}
      style={{
        backgroundImage: `url(${hero.images[Math.floor(Math.random() * hero.images.length)] ?? notFoundHeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={cn(
        "rounded-md shadow-md overflow-hidden border-2 h-96 hover:scale-102 hover:shadow-lg transition-all cursor-pointer relative",

        className
      )}
    >
      <span className="text-xl font-semibold p-1 rounded-br-md bg-white inline-block">
        {hero.nickname}
      </span>
      <Modal
        title="Hero Details"
        isOpen={isHeroShowing}
        onClose={() => {
          setIsHeroShowing(false);
        }}
      >
        <FullHeroInfo hero={hero} />
      </Modal>
    </div>
  );
};
