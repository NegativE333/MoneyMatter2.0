import Header from "@/components/Header";
import Card from "./components/Card";
import getRemindersByUserId from "@/actions/getRemindersByUserId";

const Reminders = async () => {
  const reminders = await getRemindersByUserId();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header loc="reminders">
      </Header>
      {reminders.length === 0 ? (
        <div className="flex items-center justify-center w-full">
          <h1 className="font-bold text-3xl mt-6">No reminder added.</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
          {reminders.map((reminder) => (
            <Card
              key={reminder.id}
              id={reminder.id}
              type={reminder.type}
              amount={reminder.amount}
              name={reminder.name}
              For={reminder.for}
              created_at={reminder.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reminders;
