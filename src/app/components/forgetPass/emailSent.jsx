import { Button, Card, Typography } from 'antd';
import emailSent from "../../../assets/img/emailSent.svg"
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const EmailSent = () => {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md rounded-xl shadow-md p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4 text-[#3B82F6] text-4xl">
         <img src={emailSent} alt='emailSent' />
        </div>

        {/* Text Content */}
        <Title level={4} className="!mb-1">Check Your Email</Title>
        <Text type="secondary">Link sent to your registered email address</Text>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            type="primary"
            className="bg-[#3B82F6] hover:bg-[#2563EB] px-6"
            onClick={() => window.open('https://mail.google.com', '_blank')}
          >
            CHECK MAIL
          </Button>
          <Button
            type="default"
            className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default EmailSent