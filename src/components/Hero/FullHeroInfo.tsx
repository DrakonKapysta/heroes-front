import { cn } from "@/lib/utils";
import { Superpower, SuperpowerLabels, type Hero } from "@/types";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface FullHeroInfoProps extends ComponentPropsWithoutRef<"div"> {
  hero: Hero;
}

export const FullHeroInfo: FC<FullHeroInfoProps> = ({ className, hero }) => {
  return (
    <div
      className={cn(
        "space-y-4 max-w-2xl max-h-[90svh] overflow-y-auto",
        className
      )}
    >
      {hero.images && hero.images.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto max-h-68">
            {hero.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${hero.nickname} ${index + 1}`}
                className="w-full h-32 object-cover rounded-md border"
              />
            ))}
          </div>
          <Separator />
        </div>
      )}

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold">Nickname</h3>
          <p className="text-xl font-bold text-primary">{hero.nickname}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Real Name</h3>
          <p className="text-lg">{hero.real_name || "Unknown"}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Catch Phrase</h3>
          <p className="text-lg italic text-muted-foreground">
            "{hero.catch_phrase || "No catch phrase available"}"
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Origin Story</h3>
        <p className="text-sm leading-relaxed">
          {hero.origin_description || "No origin story available."}
        </p>
      </div>

      <Separator />

      {hero.superpowers && hero.superpowers.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Superpowers</h3>
          <div className="flex flex-wrap gap-2">
            {hero.superpowers.map((power, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {SuperpowerLabels[power as Superpower] || power}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="pt-1 border-t flex justify-between items-center">
        <p className="text-xs text-muted-foreground">ID: {hero.id}</p>
        <Link
          to="/update-hero/$heroId"
          params={{ heroId: hero.id }}
          className="p-1 cursor-pointer"
        >
          <Edit size={20} className="text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
};
