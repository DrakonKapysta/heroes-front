import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ComponentPropsWithRef, FC } from "react";
import { Link } from "@tanstack/react-router";

export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginFormProps
  extends Omit<ComponentPropsWithRef<"form">, "onSubmit"> {
  onSubmit?: (data: LoginFormData) => void;
  isDisabled?: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({
  isDisabled,
  onSubmit,
  className,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit || ((data: LoginFormData) => {}))}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isDisabled || isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center space-x-1">
          <span className="text-muted-foreground">
            Still don't have an account?
          </span>
          <Link className="text-blue-400" to="/register">
            Register!
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
