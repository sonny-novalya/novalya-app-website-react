import  { useState } from "react";
import { Steps, Button } from "antd";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import Layout from "../Layout";

const { Step } = Steps;

const Dashboard = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    { title: "Install Extension", content: <FirstStep /> },
    { title: "Connect Social Networks", content: <SecondStep /> },
    { title: "Dashboard Overview", content: <ThirdStep /> },
  ];

  return (
    <Layout >
      <h3 className="text-lg font-bold mb-5">Dashboard</h3>
      <div className="bg-white p-3 rounded-lg">
        <Steps current={current}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
      </div>

      <div className="mt-8">{steps[current].content}</div>

      <div className="mt-4 flex justify-between">
        {
          current > 0
          ? <Button onClick={() => setCurrent(current - 1)}>Previous</Button>
          : <span></span>
        }
        {current < steps.length - 1 
          ? <Button type="primary" onClick={() => setCurrent(current + 1)}>
              Next
            </Button>
          : <Button type="primary">Finish</Button>
        }
      </div>
    </Layout>
  );
};

export default Dashboard;