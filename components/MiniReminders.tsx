import getFiveReminders from "@/actions/getFiveReminders";
import MiniRemComp from "./MiniRemComp";
import SidebarAddButton from "./SidebarAddButton";
// import getTotalExp from "@/actions/getTotalExp";

const MiniReminders = async () => {

  const fiveReminders = await getFiveReminders();
  // const totalExp = await getTotalExp();
  // console.log(totalExp);
  
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-[1.25rem]">Reminders</h1>
      {fiveReminders.map((reminder, i) => (
        <MiniRemComp 
          index={i+1}
          key={reminder.id}
          type={reminder.type}
          name={reminder.name}
          For={reminder.for}
          amount={reminder.amount}
        />
      ))}
      <SidebarAddButton 
        title="Add Reminder"
        type="reminder"
      />
      {/* {totalExp.map((item, i) => (
        <div key={i}>
          {item.total}
        </div>
      ))} */}
    </div>
  );
};

export default MiniReminders;
