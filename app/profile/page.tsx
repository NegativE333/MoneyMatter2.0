'use client';

import Header from "@/components/Header";
import Card from "./components/Card";
import { useRouter } from "next/navigation";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useAddMoneyModal from "@/hooks/useAddMoneyModal";

export const revalidate = 0;

const Profile = async () => {
  const router = useRouter();
  const {
    supabaseClient
  } = useSessionContext();
  const { user } = useUser();
  const authModal = useAuthModal();
  const addMoney = useAddMoneyModal();

  // if(!user){
  //   authModal.onOpen();
  // }

  const{
    data,
    error
  } = await supabaseClient.rpc('avail_money', { id: user?.id});

  const{
    data: expData,
    error: expError
  } = await supabaseClient.rpc('exp_total', { user_id: user?.id});

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.push('/');
    if (error) {
      console.log(error);
    }
  };

  const handleRem = () => {
    router.push("/reminders");
  };

  const handleView = () => {
    router.push("/allExp")
  }

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header loc="profile">
      </Header>
      <div className="grid grid-cols-1 lg:grid-cols-3 p-6 gap-8">
        <Card
          title="Available Money"
          data={data}
          subtitle=""
          subtitle2="Add Money"
          isButton
        />
        <Card
          title="Money Spent"
          subtitle=" "
          subtitle2="All time"
          data=""
          data2={expData}
        />
        <Card
          title="Reminders"
          subtitle=""
          subtitle2="View all"
          onClick={handleRem}
        />
        <Card
          title="All Expenses"
          subtitle=""
          subtitle2="View all"
          onClick={handleView}
        />
        <Card
          title="Log out"
          subtitle=""
          subtitle2="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Profile;
