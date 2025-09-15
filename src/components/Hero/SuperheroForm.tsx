import { useEffect, type ComponentPropsWithoutRef, type FC } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Superpower, SuperpowerLabels } from "@/types";

export interface SuperheroFormProps
  extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  buttonTitle?: string;
  onSubmit?: (data: HeroFormData) => void;
  onDelete?: (id: string) => void;
  defaultValues?: Partial<HeroFormData>;
}

export interface HeroFormData {
  id: string;
  nickname: string;
  real_name?: string;
  origin_description?: string;
  catch_phrase?: string;
  superpowers?: Superpower[];
  images?: FileList;
  existingImages?: string[];
  removedImages?: string[];
}

export const SuperheroForm: FC<SuperheroFormProps> = ({
  buttonTitle,
  onDelete,
  onSubmit,
  defaultValues,
  className,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<HeroFormData>({
    defaultValues: {
      ...defaultValues,
    },
  });

  const handleSuperpowerChange = (superpower: Superpower, checked: boolean) => {
    if (checked) {
      setValue("superpowers", [...selectedSuperpowers, superpower]);
    } else {
      setValue(
        "superpowers",
        selectedSuperpowers.filter((sp) => sp !== superpower)
      );
    }
  };

  const selectedSuperpowers = watch("superpowers") || [];

  const formOnSubmit = (data: HeroFormData) => {};

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit || formOnSubmit)}
      className={cn("space-y-6", className)}
    >
      <div className="space-y-2">
        <Label htmlFor="nickname">Nickname *</Label>
        <Input
          id="nickname"
          {...register("nickname", { required: "Nickname is required" })}
          placeholder="e.g., Batman"
        />
        {errors.nickname && (
          <p className="text-red-500 text-sm">{errors.nickname.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="real_name">Real Name</Label>
        <Input
          id="real_name"
          {...register("real_name")}
          placeholder="e.g., Bruce Wayne"
        />
        {errors.real_name && (
          <p className="text-red-500 text-sm">{errors.real_name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="origin_description">Origin Description</Label>
        <Textarea
          id="origin_description"
          {...register("origin_description")}
          placeholder="Describe the hero's origin story..."
          rows={4}
        />
        {errors.origin_description && (
          <p className="text-red-500 text-sm">
            {errors.origin_description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="catch_phrase">Catch Phrase</Label>
        <Input
          id="catch_phrase"
          {...register("catch_phrase")}
          placeholder="e.g., To fight crime and protect Gotham City"
        />
        {errors.catch_phrase && (
          <p className="text-red-500 text-sm">{errors.catch_phrase.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Superpowers</Label>
        <div className="max-h-40 overflow-y-auto border rounded-md p-3">
          <div className="flex flex-wrap">
            {Object.values(Superpower).map((superpower, index) => (
              <div
                key={superpower}
                className="flex-1 basis-1/2 flex items-center gap-2 min-h-[24px]"
              >
                <input
                  type="checkbox"
                  id={superpower + index}
                  checked={selectedSuperpowers.includes(superpower)}
                  onChange={(e) =>
                    handleSuperpowerChange(superpower, e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <Label
                  htmlFor={superpower + index}
                  className="text-sm font-normal cursor-pointer leading-tight"
                >
                  {SuperpowerLabels[superpower]}
                </Label>
              </div>
            ))}
          </div>
        </div>
        {selectedSuperpowers.length === 0 && (
          <p className="text-slate-600/80 text-sm">
            Superpowers are optional, cause not all heroes have them.
          </p>
        )}
      </div>

      {watch("existingImages") && (
        <div className="space-y-2">
          <Label>Existing Images</Label>
          {watch("existingImages")?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4  overflow-y-auto h-48">
              {watch("existingImages")?.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Hero image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    variant={"destructive"}
                    size="sm"
                    className="absolute top-2 right-2 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const currentImages = watch("existingImages") || [];
                      setValue(
                        "existingImages",
                        currentImages.filter((_, i) => i !== index)
                      );
                      const imagesToRemove = watch("removedImages") || [];
                      setValue("removedImages", [...imagesToRemove, imageUrl]);
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No existing images</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="images">Hero Images</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          {...register("images")}
        />
        <p className="text-sm text-gray-500">
          You can upload multiple images for the hero
        </p>
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          {buttonTitle ? buttonTitle : "Create Hero"}
        </Button>
        {onDelete && (
          <Button
            type="button"
            variant="destructive"
            className=""
            onClick={() => {
              onDelete(getValues("id"));
            }}
          >
            Delete Hero
          </Button>
        )}
      </div>
    </form>
  );
};
