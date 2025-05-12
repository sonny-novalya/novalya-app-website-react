import  { useEffect, useState } from 'react';
import { Input, Button, Card, Typography, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate,useParams } from 'react-router-dom';
import useAuthStore from '../../../../store/auth/auth-store';

const { Title, Text } = Typography;
const ResetPassword = () => {
      const {validateEmailToken,resetPass}=useAuthStore()
      const { token, email } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
    const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   const navigate = useNavigate();

   const checkToken = async()=>{
    const payload ={
      token, email
    }
    const  res = await validateEmailToken(payload)

    console.log(res)

    if (res.status === 200) {
         setValidToken(true);
    }else{
           setValidToken(false);
    }
   }


   const  submitPass = async ()=>{
    if (newPassword !== confirmPassword) {
        message.error("Passwords do not match!")
        return
    }
      const res = await resetPass({email,password:newPassword})

       if(res.status === 200){
        message.success("Password has been changed")
         navigate("/login")
       }

   }
 useEffect(() => {
    checkToken();
  }, []);
  

    
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md rounded-xl shadow-md p-8">
        <div className="mb-4">
          <Title level={4} className="!mb-0">Change Password</Title>
          <Text type="secondary">Enter your New Password</Text>
        </div>

        <form onSubmit={(e)=>e.preventDefault()}  className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <Input.Password
              placeholder="Enter new password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <Input.Password
              placeholder="Confirm new password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              type="primary"
              className="bg-[#3B82F6] hover:bg-[#2563EB] px-8"
              onClick={()=>submitPass()}
              disabled={!validToken}
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ResetPassword