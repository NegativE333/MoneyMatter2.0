// import { ExpTotal } from "@/types";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";


// const getTotalExp = async () : Promise<ExpTotal [] > => {
//     const supabase = createServerComponentClient({
//         cookies: cookies
//     })

//     const { data: sessionData, error: sessionError} = await supabase.auth.getSession();

//     if(sessionError){
//         console.log(sessionError.message);
//         return [];
//     }

//     const { data, error } = await supabase
//         .rpc('exp_sum')

//     if(error){
//         console.log(error.message);
//     }

//     return (data as any) || [];
// }

// export default getTotalExp;