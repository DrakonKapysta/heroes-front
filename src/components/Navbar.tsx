import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, FC } from "react";
import { ScanFaceIcon } from "lucide-react";
import { Profile } from "./Auth/Profile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAuth } from "./Auth/auth";
import { Button } from "./ui/button";

export interface NavbarProps extends ComponentPropsWithoutRef<"nav"> {}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const auth = useAuth();
  const handleProfileSave = async (username: string) => {
    await auth.changeProfile(username);
  };
  const handleLogout = () => {
    auth.logout();
    navigate({ to: "/" });
  };
  return (
    <nav
      className={cn(
        "p-2 md:text-xl font-semibold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-[#F5F6FA]",
        className
      )}
    >
      <div className=" flex gap-4 items-center">
        <div className="flex gap-2 items-center sm:pl-10">
          <ScanFaceIcon size={48} />
          {!isMobile && <span className="text-2xl">Superheroes</span>}
        </div>
        <div className="flex gap-4 items-center justify-end underline underline-offset-3 flex-1 sm:gap-12">
          <Link className="" to="/">
            Browse
          </Link>
          <Link
            className="p-2 border rounded-md whitespace-nowrap"
            to="/create-hero"
          >
            Create Hero
          </Link>
        </div>
        <div className="flex-1 flex justify-end sm:pr-10">
          {auth.isAuthenticated ? (
            <div className="bg-[#374151] max-w-12 rounded-full p-2 shadow-sm hover:shadow-[#475469] hover:scale-105">
              <Profile
                username={auth.user?.username}
                onSave={handleProfileSave}
                onLogout={handleLogout}
              />
            </div>
          ) : (
            <Link to="/login">
              <Button
                className="px-4 py-5 md:text-base font-semibold"
                variant="default"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
