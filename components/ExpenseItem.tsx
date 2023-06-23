'use client';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineDinnerDining } from 'react-icons/md';
import { FiCoffee } from 'react-icons/fi';

interface ExpenseItemProps{
    name: string;
    expense: string;
    created_at: string;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
    name,
    expense,
    created_at
}) => {

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

    if(name === 'chai' || name==='Chai' || name==='Tea' || name==='tea'){
        Icon = FiCoffee
    }
    else if(name === 'dinner' || name==='Dinner' || name==='lunch' || name==='Lunch' || name==='J1' || name==='j1'){
        Icon = MdOutlineDinnerDining;
    }
    else{
        Icon = AiOutlineShoppingCart
    }

    return(
        <button
            className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
        >
            <div className="relative min-h-[50px] lg:min-w-[64px] min-w-[48px] flex items-center justify-center bg-neutral-800/80">
                <Icon size={36}/>
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