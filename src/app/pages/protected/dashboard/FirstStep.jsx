import { Button } from 'antd'

const FirstStep = () => {
  return (
    <div className=" bg-gray-100  flex flex-col space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between h-64">
        <div>
          <h2 className="text-3xl font-bold">Software Status</h2>
          <p className="mt-2">
            activate_extension
          </p>
          <Button  size="large" className="mt-4">
            Install Extension →
          </Button>
        </div>
        <div className="hidden md:block">
          <img
            src="/mnt/data/image.png"
            alt="Software Status"
            className="w-60"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
          <div className='flex justify-between'>
            <div className='w-4/5'>
              <h3 className="text-lg font-bold">Upgrade your account</h3>
              <p className="text-gray-600 mt-2">
                current_plan_feature
              </p>
            </div>
            <div className="rounded-full border bg-[#0087FF] text-white px-3 py-3 text-sm flex items-center justify-center flex-col ">
              <span>Up to</span>
              <span>*35% off*</span>
            </div>
          </div>
          <Button type="primary" size="large" className='mt-5'>
            Upgrade Now →
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex justify-between flex-col">
          <div className='flex flex-col justify-between'>
            <h3 className="text-lg font-bold">
              Promote and get paid
            </h3>
            <p className="text-gray-600 mt-2">
              sharing_link_feature
            </p>
          </div>
          <Button type="primary" size="large" className="mt-5">
            My Affiliate Links →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FirstStep
