'use client';

import { AiOutlineShoppingCart, AiOutlineScissor, AiOutlineMobile, AiOutlineCar, AiOutlineHome } from 'react-icons/ai';
import { MdOutlineDinnerDining } from 'react-icons/md';
import { RxScissors } from 'react-icons/rx';
import { FiCoffee } from 'react-icons/fi';

import useDeleteExpModal from '@/hooks/useDeleteExpModal';
import DeleteExpModal from './DeleteExpModal';

interface ExpenseItemProps{
    id: string;
    name: string;
    expense: string;
    created_at: string;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
    id,
    name,
    expense,
    created_at
}) => {
    const deleteExpModal = useDeleteExpModal();
    const date = created_at.slice(8, 10);
    const month = created_at.slice(5, 7);
    let Icon = FiCoffee;
    let monthL = 'Jun';

    switch(month){
        case '01':
            monthL = 'Jan';
            break;
        case '02':
            monthL = 'Feb';
            break;
        case '03':
            monthL = 'Mar';
            break;
        case '04':
            monthL = 'Apr';
            break;
        case '05':
            monthL = 'May';
            break;
        case '06':
            monthL = 'Jun';
            break;
        case '07':
            monthL = 'Jul';
            break;
        case '08':
            monthL = 'Aug';
            break;
        case '09':
            monthL = 'Sep';
            break;
        case '10':
            monthL = 'Oct';
            break;
        case '11':
            monthL = 'Nov';
            break;
        case '12':
            monthL = 'Dec';
            break;
        default:
            monthL = '';
            break;
    }

    if(name === 'chai' || name==='Chai' || name==='Tea' || name==='tea' || name === 'coffee' || name === 'Coffee'){
        Icon = FiCoffee
    }
    else if(name === 'dinner' || name==='Dinner' || name==='lunch' || name==='Lunch' || name==='J1' || name==='j1'){
        Icon = MdOutlineDinnerDining;
    }
    else if(name === 'cutting' || name==="Cutting" || name==='barber'){
        Icon = AiOutlineScissor;
    }
    else if(name === 'recharge' || name === 'Mobile Recharge' || name==='mobile recharge' || name === 'Recharge' || name === 'top up' || name === 'Top Up' || name === 'Data pack' || name === 'data pack' || name === 'top up'){
        Icon = AiOutlineMobile
    }
    else if(name === 'car' || name === 'cab' || name === 'taxi' || name === 'Cab'){
        Icon = AiOutlineCar
    }
    else if(name === 'home rent' || name === 'Rent' || name === 'rent' || name === 'Home rent'){
        Icon = AiOutlineHome
    }
    else{
        Icon = AiOutlineShoppingCart
    }

    return(
        <button
            onClick={() => deleteExpModal.onOpen(id)}
            className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
        >
            <div className="relative min-h-[50px] lg:min-w-[64px] min-w-[48px] flex items-center justify-center bg-neutral-800/80">
                <Icon size={36} className='flex hover:hidden'/>
            </div>
            <p className="font-medium truncate">
                {name}
            </p>
            <div className='w-[30%] flex justify-center items-center'>
                <div className="absolute right-16 font-bold">
                    {expense} ₹
                </div>
                <div className="absolute right-1 font-bold">
                    {date} {monthL}
                </div>    
            </div>
        </button>
    )
}

export default ExpenseItem;