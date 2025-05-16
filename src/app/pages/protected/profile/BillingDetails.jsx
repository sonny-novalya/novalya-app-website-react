import SubsDetails from './billingComponents/subsDetails';
import AddOns from './billingComponents/AddOns';
import PaymentMethods from './billingComponents/PaymentMethods';

const BillingDetails = ({ userMail }) => {
  return (
    <div className="bg-white p-5 rounded-md rounded-tl-none shadow-md border border-[#0087FF33]">
      <p className="text-gray-600 text-[16px] mb-4">
        <span className="font-semibold">Email :</span> {userMail}
      </p>

      <div className='p-6 rounded border border-[#DADADA] flex flex-col gap-4'>
        <SubsDetails />
        <AddOns />
        <PaymentMethods />
      </div>
    </div>
  );
}

export default BillingDetails
