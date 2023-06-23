import { Exp } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const get30ExpByUserId = async () : Promise<Exp[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data: sessionData, error: sessionError} = await supabase.auth.getSession();

    if(sessionError){
        console.log(sessionError.message);
        return[];
    }

    const { data, error } = await supabase
        .from('expense')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false})
        .limit(30)

    if(error){
        console.log(error.message);
    }

    return (data as any) || [];
}

export default get30ExpByUserId;