'use client';

import Header from "@/components/Header";
import Card from "./components/Card";
import { useRouter } from "next/navigation";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useAddMoneyModal from "@/hooks/useAddMoneyModal";
// import getMoneyByUserId from "@/actions/getMoneyByUserId";

const Profile = async () => {
  const router = useRouter();
  const {
    supabaseClient
  } = useSessionContext();
  // const getMoney = getMoneyByUserId();
  const { user } = useUser();
  const authModal = useAuthModal();
  const addMoney = useAddMoneyModal();

  if(!user){
    authModal.onOpen();
  }

  const{
    data,
    error
  } = await supabaseClient 
    .from('users')
    .select('avail')
    .eq('id', user?.id)


  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      console.log(error);
    }
  };

  // const handleAdd = () => {
  //   addMoney.onOpen();
  // }

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
          // @ts-ignore: Object is possibly 'null'
          data={data[0].avail}
          subtitle=""
          subtitle2="Add Money"
          // onClick={handleAdd}
          isButton
        />
        <Card
          title="Money Spent"
          subtitle="This month"
          subtitle2="All time"
          data="1000"
          data2="70000"
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
