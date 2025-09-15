import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SuperheroForm,
  type HeroFormData,
} from "@/components/Hero/SuperheroForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_protected/create-hero")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const onSubmit = async (data: HeroFormData) => {
    const formData = new FormData();

    formData.append("nickname", data.nickname);
    if (data.real_name) formData.append("real_name", data.real_name);
    if (data.origin_description)
      formData.append("origin_description", data.origin_description);
    if (data.catch_phrase) formData.append("catch_phrase", data.catch_phrase);
    if (data.superpowers?.length)
      data.superpowers.forEach((p) => formData.append("superpowers", p));

    if (data.images?.length) {
      Array.from<File>(data.images).forEach((file) => {
        formData.append("heroImages", file);
      });
    }

    const res = await fetch("http://localhost:5000/superheroes/create", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (res.ok) {
      toast.success("Superhero created successfully");
      navigate({ to: "/" });
    }
  };
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Superhero</CardTitle>
        </CardHeader>
        <CardContent>
          <SuperheroForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
