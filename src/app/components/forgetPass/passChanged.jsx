import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import passChanged from "../../../assets/img/checkPass.svg";
import logo from "../../../assets/img/novalya-blue.png";
import NovaBlue from "../../../assets/img/nova-blur.png";

const { Title, Text } = Typography;

const PassChanged = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white px-4">
      <div className="p-5">
        <img src={logo} alt="logo" className="h-12" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center relative overflow-hidden pb-20">
        <img
          src={NovaBlue}
          alt="blur-bg"
          className="h-52 opacity-50 absolute left-0 bottom-0 pointer-events-none select-none"
        />

        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl z-10 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4 text-[#3B82F6] text-4xl">
            <img src={passChanged} alt="Password Changed" />
          </div>

          {/* Text Content */}
          <Title level={4} className="!mb-1">Password Changed Successfully</Title>
          <Text type="secondary">You have successfully reset your password.</Text>

          {/* Back to Login */}
          <button
            onClick={() => navigate("/login")}
            className="mt-6 py-2 w-full px-6 rounded text-sm !bg-[#0087FF] cursor-pointer !border-none !text-white hover:!bg-[#0073E6]"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassChanged;
