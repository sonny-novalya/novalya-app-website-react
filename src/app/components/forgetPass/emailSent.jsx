import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/img/novalya-blue.png";
import NovaBlue from "../../..//assets/img/nova-blur.png";

const EmailSent = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen bg-white px-4">
    <div className="p-5">
        <img src={logo} alt="logo" className="h-12" />
    </div>
    <div className="flex flex-1 flex-col items-center justify-center relative overflow-hidden pb-10">
        <img
            src={NovaBlue}
            alt="blur-bg"
            className="h-52 opacity-50 absolute left-0 bottom-0 pointer-events-none select-none"
        />
        <div className="w-full flex gap-6 flex-col items-center max-w-md p-8 bg-white rounded-lg shadow-2xl z-10 ">
          <h1 className="text-2xl font-bold mt-2">Check Your Email</h1>
          <p className="text-[#757575] text-center">An email to reset your password has been sent. Please also check your spam folder</p>
            {/* <button
            type="primary"
            className="bg-[#3B82F6] hover:bg-[#2563EB] px-6"
            onClick={() => window.open('https://mail.google.com', '_blank')}
          >
            CHECK MAIL
          </button> */}
          <button
            type="submit"
            onClick={() => navigate('/login')}
            className="py-2 w-full px-6 rounded text-sm !bg-[#0087FF] cursor-pointer !border-none !text-white hover:!bg-[#0073E6]"
          >
            Login
          </button>
        </div>
    </div>
</div>
   
  )
}

export default EmailSent