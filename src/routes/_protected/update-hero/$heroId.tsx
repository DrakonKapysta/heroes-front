import {
  SuperheroForm,
  type HeroFormData,
} from "@/components/Hero/SuperheroForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_protected/update-hero/$heroId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { heroId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["hero", heroId],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/superheroes/" + heroId, {
        credentials: "include",
      });
      const heroData = await res.json();
      return heroData;
    },
  });
  const queryClient = useQueryClient();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <span>Error: {error.message}</span>;

  const onSubmit = async (data: HeroFormData) => {
    const formData = new FormData();

    formData.append("nickname", data.nickname);
    if (data.real_name) formData.append("real_name", data.real_name);
    if (data.origin_description)
      formData.append("origin_description", data.origin_description);
    if (data.catch_phrase) formData.append("catch_phrase", data.catch_phrase);
    if (data.superpowers?.length) {
      data.superpowers.forEach((p) => formData.append("superpowers", p));
    } else {
      formData.append("superpowers", "");
    }

    if (data.images?.length) {
      Array.from<File>(data.images).forEach((file) => {
        formData.append("heroImages", file);
      });
    }
    if (data.existingImages && data.existingImages.length > 0) {
      data.existingImages.forEach((img) => {
        const pathname = new URL(img).pathname;
        const fileName = pathname.split("/").pop();
        if (fileName) {
          formData.append("images", fileName);
        }
      });
    }
    if (data.removedImages?.length) {
      data.removedImages.forEach((img) => {
        const pathname = new URL(img).pathname;
        const fileName = pathname.split("/").pop();
        if (fileName) {
          formData.append("removedImages", fileName);
        }
      });
    }

    try {
      await fetch("http://localhost:5000/superheroes/" + data.id, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      toast.success("Superhero updated successfully");
      queryClient.invalidateQueries({ queryKey: ["hero", heroId] });
    } catch (error) {}
  };

  const onDelete = async (id: string) => {
    try {
      const res = await fetch("http://localhost:5000/superheroes/" + id, {
        credentials: "include",
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Superhero deleted successfully");
        navigate({ to: "/" });
      }
      queryClient.invalidateQueries({ queryKey: ["heroes"] });
    } catch (error) {}
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Update Superhero</CardTitle>
        </CardHeader>
        <CardContent>
          <SuperheroForm
            buttonTitle="Update Hero"
            defaultValues={{
              ...data,
              existingImages: data.images,
            }}
            onSubmit={onSubmit}
            onDelete={onDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
