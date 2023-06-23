'use client';

import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";

export const revalidate = 0;

const MoneyDetails = async () => {
  const { user } = useUser();
  const {
    supabaseClient
  } = useSessionContext();
  const{
    data: expData,
    error: expError
  } = await supabaseClient.rpc('exp_total', { user_id: 'e27a9085-a616-4d85-baf6-1f0c24455ec0'});
  // console.log(expData);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-[1.25rem]">Money Spent</h1>
      {/* <p className="font-semibold">This month: 5000 ₹</p> */}
      {/* <p className="font-semibold">All time: {expData}</p> */}
    </div>
  );
};

export default MoneyDetails;
