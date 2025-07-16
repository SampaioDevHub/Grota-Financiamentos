import { User } from "lucide-react";
import { Button } from "@/src/presentation/layout/components/ui/button";

const UserProfile = () => {
  return (
    <div className="hidden md:flex items-center">
      <Button className="cursor-pointer">
        <User className="h-5 w-5" />
        Area do Logista
      </Button>
    </div>
  );
};

export default UserProfile;
