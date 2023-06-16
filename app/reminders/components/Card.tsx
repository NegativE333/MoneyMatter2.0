'use client';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai'; 

interface CardProps{
    id: string
    type: string;
    amount: string;
    name: string;
    For: string;
    created_at: string;
}

const Card: React.FC<CardProps> = ({
    id,
    type,
    amount,
    name,
    For,
    created_at
}) => {
    let isOwe = false;
    const date = created_at.slice(8,10);
    const month = created_at.slice(5,7);
    const year = created_at.slice(2,4);
    if(type==='owe'){
        isOwe = true;
    }

    const authModal = useAuthModal();
    const {
        supabaseClient
      } = useSessionContext();
    const {user} = useUser();
    const router = useRouter();

    const handleDelete =  async () => {
        if(!user){
            return authModal.onOpen();
        }
        const { error } = await supabaseClient
            .from('reminder')
            .delete()
            .eq('user_id', user.id)
            .eq('id', id)
        
            if(error){
                toast.error('Something went wrong');
            }
            else{
                toast.success('Reminder deleted.');
            }

            router.refresh();
    }
    return(
        <div className="min-h-[156px] min-w-[128px] bg-neutral-700/60 rounded-lg flex flex-col gap-4 items-center justify-center text-center p-4">
            {isOwe ? (
                <p className="font-bold text-lg">
                    You owe {name} {amount} ₹ for {For} on date {date}-{month}-{year}.
                </p>
            ): ( 
                <p className="font-bold text-lg">
                    {name} owes you {amount} ₹ for {For} on date {date}-{month}-{year}.
                </p>
            )}
            <button 
                onClick={handleDelete}
                className="bg-white hover:bg-neutral-300 transition p-1 rounded-full"
            >
                <AiOutlineDelete size={20} className='text-black'/>
            </button>
        </div>
    )
}

export default Card;