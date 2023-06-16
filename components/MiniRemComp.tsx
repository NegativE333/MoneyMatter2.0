

interface MiniRemCompProps{
    type: string;
    name: string;
    For: string;
    amount: string;
    index: number
}

const MiniRemComp: React.FC<MiniRemCompProps> = ({
    type,
    name,
    For,
    amount,
    index
}) => {
    let isOwes = true;
    if(type === 'owe'){
        isOwes = false;
    }

    return(
        <div>
            {isOwes ? 
                <p className="font-semibold">
                    {index}) {name} owes you {amount} ₹ for {For}.
                </p>
            : 
                <p className="font-semibold">
                    {index}) You owe {name} {amount} ₹ for {For}.
                </p>
            }
        </div>
    )
}

export default MiniRemComp;