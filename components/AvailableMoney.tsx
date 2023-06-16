import SidebarAddButton from './SidebarAddButton';
import getMoneyByUserId from '@/actions/getMoneyByUserId';

const AvailableMoney = async () => {
  const getMoney = await getMoneyByUserId();
  return (
    <div className="flex flex-col">
      <p className="font-bold text-[1.25rem] mt-6">
        Available Money : 
        {getMoney.length === 0 ? 
          (
            <>
            </>
          ): (
            <>{getMoney[0].avail} ₹</>
          )} 
      </p>
      <SidebarAddButton 
        title='Add Money'
        type='money'
      />
    </div>
  );
};

export default AvailableMoney;
