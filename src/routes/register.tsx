import { useAuth } from "@/components/Auth/auth";
import {
  RegisterForm,
  type RegisterFormData,
} from "@/components/Auth/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/register")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: RouteComponent,
});

const fallback = "/" as const;

function RouteComponent() {
  const auth = useAuth();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const onFormSubmit = async (data: RegisterFormData) => {
    try {
      const res = await auth.register(data.username, data.email, data.password);
      if (res) {
        await navigate({ to: search.redirect || fallback });
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center  bg-gray-100">
      <RegisterForm onSubmit={onFormSubmit} />
    </div>
  );
}
