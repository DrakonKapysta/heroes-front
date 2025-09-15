import { useAuth } from "@/components/Auth/auth";
import { LoginForm, type LoginFormData } from "@/components/Auth/LognForm";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import React from "react";
import { z } from "zod";

const fallback = "/" as const;

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const router = useRouter();
  const navigate = Route.useNavigate();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const search = Route.useSearch();

  const onFormSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await router.invalidate();

      const res = await auth.login(data.email, data.password);
      if (res) {
        await navigate({ to: search.redirect || fallback });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center  bg-gray-100">
      <LoginForm isDisabled={isSubmitting} onSubmit={onFormSubmit} />
    </div>
  );
}
