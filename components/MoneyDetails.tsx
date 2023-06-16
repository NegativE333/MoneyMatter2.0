import { AiOutlinePlus } from "react-icons/ai";

const MoneyDetails = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-[1.25rem]">Money Spent</h1>
      <p className="font-semibold">This month: 5000 ₹</p>
      <p className="font-semibold">All time: 4000 ₹</p>
      
    </div>
  );
};

export default MoneyDetails;
