import ExpenseItem from "./ExpenseItem";
import { Exp } from "@/types";

interface PageContentProps{
    exps: Exp[];
}

const PageContent: React.FC<PageContentProps> = ({
    exps
}) => {
    return(
        <div className="p-6">
            <h1 className="pb-4 font-semibold text-xl">
                Your last 30 expenses
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
                
                {exps.map((exp) => (
                    <ExpenseItem 
                        key={exp.id}
                        name={exp.title}
                        expense={exp.amount}
                        created_at={exp.created_at}
                    />
                ))}
            </div>
        </div>
    )
}

export default PageContent;