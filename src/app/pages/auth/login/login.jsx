import { useState } from "react";
import { Input, Checkbox, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../../store/auth/useAuthStore";
import GlobeImg from "../../../../../src/assets/img/globe.png";
import NovalyaFullWhiteLogo from "../../../../../src/assets/img/NovalyaFullWhiteLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      message.error("Email and Password are required!");
      return;
    }

    const response = await login(email, password);

    if (response.success) {
      message.success("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard after login
    } else {
      message.error(error || "Login failed!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] px-4">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="w-1/2 bg-gradient-to-r from-[#005199] to-[#0087FF] px-10 py-20 flex flex-col justify-center items-center text-white">
          <img src={NovalyaFullWhiteLogo} alt="Novalya Logo" />
          <p className="mt-4 text-2xl text-center font-semibold">#1 Marketing Platform</p>
          <p className="text-2xl text-center font-semibold">for Organic Lead Generation</p>
          <div className="mt-8">
            <img src={GlobeImg} alt="Globe" className="w-64 h-64" />
          </div>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-lg font-medium text-gray-600">Welcome back! 👋</h2>
          <h1 className="text-2xl font-bold mt-2">Login to your account</h1>

          <form className="mt-6" onSubmit={handleLogin}>
            <div>
              <label className="text-gray-600 text-sm font-semibold">Email</label>
              <Input
                type="text"
                className="mt-2 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <label className="text-gray-600 text-sm font-semibold">Password</label>
              <Input.Password
                className="py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              <div className="text-right mt-2">
                <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <Checkbox className="text-gray-600">Remember me!</Checkbox>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-4 py-2 px-6 rounded text-sm !bg-[#0087FF] !border-none !text-white hover:!bg-[#0073E6] w-fit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "SIGN IN"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Not registered?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
