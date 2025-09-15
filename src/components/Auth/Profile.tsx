import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "lucide-react";
import type { FC } from "react";
export interface ProfileProps {
  trigger?: React.ReactNode;
  username?: string;
  onSave?: (username: string) => void;
  onLogout?: () => void;
}

export const Profile: FC<ProfileProps> = ({
  username,
  trigger,
  onSave,
  onLogout,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ? trigger : <User size={32} className="text-white" />}
      </SheetTrigger>
      <SheetContent>
        <form
          className="flex flex-col flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            onSave?.(e.currentTarget.username.value);
          }}
        >
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={username || "@pendragon"} />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLogout?.();
              }}
              variant="destructive"
            >
              LogOut
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
