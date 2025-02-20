import { Button } from "antd"

const SecondStep = () => {
  return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Connect Social Networks</h2>
          <div className="flex space-x-4">
              <Button type="primary" className="bg-blue-500">Connect Facebook</Button>
              <Button type="primary" className="bg-blue-500">Connect Instagram</Button>
          </div>
      </div>
  )
}

export default SecondStep