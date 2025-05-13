import { Button, Card, Typography } from 'antd';
import passChanged from "../../../assets/img/checkPass.svg"
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;


const PassChanged = () => {

      const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md rounded-xl shadow-md p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4 text-[#3B82F6] text-4xl">
         <img src={passChanged} alt='emailSent' />
        </div>

        {/* Text Content */}
        <Title level={4} className="!mb-1">Password Changed Successfully</Title>
        <Text type="secondary">You have successfully reset your password.</Text>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            type="primary"
            className="bg-[#3B82F6] hover:bg-[#2563EB] px-6"
               onClick={() => navigate('/login')}
          >
          Back to login
          </Button>
        </div>
      </Card>
    </div>
  )

}

export default PassChanged