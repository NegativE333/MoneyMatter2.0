'use client';

import useAddMoneyModal from "@/hooks/useAddMoneyModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

interface CardProps{
    title: string;
    subtitle?: string;
    subtitle2?: string;
    data?: string;
    data2?: string;
    dataArr?: string[];
    isButton?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    subtitle2,
    data,
    data2,
    dataArr,
    onClick
}) => {
    let flag = false;
    let isAvail = false;
    if(subtitle===''){
        flag = true;
        if(subtitle2==='Add Money'){
            isAvail = true;
        }
    }
    const addMoney = useAddMoneyModal();
    const router = useRouter();
    const onClick2 = () => {
        addMoney.onOpen();
        router.push('/');
    }
    return(
        <div className="min-w-[48px] min-h-[148px] bg-gradient-to-br from-slate-500 rounded-lg">
            {flag ? (
                <div className="flex flex-col gap-2 items-center justify-between h-full">
                    <h1 className="font-semibold text-xl mt-4">
                        {title}
                    </h1>
                    {isAvail &&  
                        (
                            <p className="font-bold text-lg">
                                {data} ₹
                            </p>
                        )
                    }
                    {flag && (
                        <button 
                            onClick={subtitle2==='Add Money' ? onClick2 : onClick}
                            className="bg-white hover:bg-neutral-300 transition text-black font-bold rounded-full p-2 mb-4">
                            {subtitle2}
                        </button>
                    )}
                </div>
            ): (
                <div className="flex flex-col items-center justify-between h-[85%]">
                    <h1 className="font-semibold text-xl mt-4">
                        {title}
                    </h1>
                    <p className="font-bold text-lg mb-4">
                        {subtitle2} : {data2} ₹
                    </p>
                </div>
            )}
            
        </div>
    )
}

export default Card;