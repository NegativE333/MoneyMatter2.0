'use client';

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { BiUserCircle } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import SidebarItem from "./SidebarItem";
import { BiLogOutCircle } from 'react-icons/bi';

const SidebarNav = () => {

    const pathName = usePathname();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    }
    else{
      toast.success('Logged out.');
    }
  };

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathName !== "/profile",
        href: "/",
      },
      {
        icon: BiUserCircle,
        label: "Profile",
        active: pathName === "/profile",
        href: "/profile",
      },
    ],
    [pathName]
  );

    return (
        <div className="flex flex-col gap-2 justify-end pb-4 w-full h-full">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
            <div 
                onClick={handleLogout}
                className="flex flex-row h-auto items-center w-full gap-x-4 text-lg font-semibold cursor-pointer hover:text-white transition text-neutral-400">
                <BiLogOutCircle size={26}/>
                <p className="truncate w-full">Logout</p>
            </div>
        </div>  
    )
}

export default SidebarNav;