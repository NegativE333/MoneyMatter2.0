

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiUserCircle, BiLogOutCircle } from "react-icons/bi";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import MoneyDetails from "./MoneyDetails";
import MiniReminders from "./MiniReminders";
import AvailableMoney from "./AvailableMoney";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from 'react-hot-toast';
import SidebarNav from "./SidebarNav";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box className="flex justify-center items-center h-[10vh]">
          <div className="text-bold text-3xl">Money Matters</div>
        </Box>
        
            <Box className="overflow-y-auto h-full pl-6">
            <div className="h-[20%]  pt-2">
              <AvailableMoney />
            </div>
  
            <div className="h-[45%]">
              <MiniReminders />
            </div>
            <div className="h-[35%]">
              <SidebarNav />
            </div>
          </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
