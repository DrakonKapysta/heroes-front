import type { AuthContext } from "@/components/Auth/auth";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RootContext {
  auth: AuthContext;
}

const RootLayout = () => (
  <>
    <div className="flex flex-col bg-gradient-to-tr from-[#0D1117] to-[#1B9AAA] min-h-svh">
      <Toaster richColors closeButton position="top-center" />
      <Navbar />
      <Outlet />

      <TanStackRouterDevtools />
    </div>
  </>
);

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
});
