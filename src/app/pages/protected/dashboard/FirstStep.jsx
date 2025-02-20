import { Button } from 'antd'

const FirstStep = () => {
  return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Software Status</h2>
          <p className="mb-4">Activate the extension to unlock access to your dashboard.</p>
          <Button type="primary">Install Extension</Button>
      </div>
  )
}

export default FirstStep
