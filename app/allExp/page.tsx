import getExpByUserId from "@/actions/getExpByUserId";
import ExpenseItem from "@/components/ExpenseItem";
import Header from "@/components/Header";
import exp from "constants";
import { AiOutlinePlus } from "react-icons/ai";

const AllExp = async () => {
  const exps = await getExpByUserId();
  return (
    <div>
      <Header loc="allExp">
        
      </Header>
      {exps.length === 0 ? (
        <div className="flex items-center justify-center w-full">
          <h1 className="font-bold text-3xl mt-6">No expense added.</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-6">
          {exps.map((exp) => (
            <ExpenseItem
              key={exp.id}
              id={exp.id}
              name={exp.title}
              expense={exp.amount}
              created_at={exp.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllExp;
