// 'use client';

// import Header from "@/components/Header";
// import { useUser } from "@/hooks/useUser";
// import { useRouter } from "next/navigation";


// const NotSign = () => {
//     const { user } = useUser();
//     const router = useRouter();
//     if(user){
//         router.push('/');
//     }
//     return(
//         <div className="h-full bg-neutral-900 rounded-lg w-full">
//             <Header hide>
//                 <h1 className="font-bold text-2xl lg:text-3xl text-white pt-6 w-full text-center">
//                     Welcome to Money Matters
//                 </h1>
//             </Header>
//             <div className="flex items-center justify-center h-[60%] pr-4 pl-4 lg:pl-64 lg:pr-64 text-center">
//                 <p className="font-semibold lg:text-xl text-lg">
//                     Sign up to unlock the full potential of our platform and gain access to personalized features tailored to your financial needs. Start tracking your expenses, managing your debts, and building a brighter financial future. Join our community of empowered users and embark on a path of financial success.       
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default NotSign;