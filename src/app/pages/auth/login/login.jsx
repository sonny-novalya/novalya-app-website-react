import { useEffect, useState } from "react";
import { Input, Checkbox, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import GlobeImg from "../../../../../src/assets/img/globe.png";
import NovalyaFullWhiteLogo from "../../../../../src/assets/img/NovalyaFullWhiteLogo.png";
import { loginUser, manualSignIn } from "../../../../services/ApiCalls";
import { loginSenerios, removeAllCookies } from "../../../../helpers/helper";
import {useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const { token, email } = useParams();
  const navigate = useNavigate()
  const {t}=useTranslation()


  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    if (!username || !password) {
      message.error("Email and Password are required!");
      return;
    }

    const creds = {username,password}

    try {
      const response = await loginUser(creds);
      if (response?.data?.status === "success") {
        removeAllCookies()
        loginSenerios(response?.data)
      } else {
        message.error(error || "Login failed!");
      }
      setIsLoading(false)
      
    } catch (error) {
      setIsLoading(false)
    }

 
  };

  const checkToken  = async (token, email)=> {
   

    if (token && email) {
      sessionStorage.setItem("iSAdmin","true")
      if (email === "manual") {
       const response = await manualSignIn(token)

     if (response?.data?.status === "success") {
        const authToken = response?.data?.token; // Assuming this is your authentication token
        const userId = response?.data?.user?.id || 0;
        localStorage.setItem("token",authToken)
        const expirationYears = 10; // 10 years
        const expirationDate = new Date();
        expirationDate.setFullYear(
          expirationDate.getFullYear() + expirationYears
        );
        document.cookie = `authToken=${authToken}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `user_id=${userId}; expires=${expirationDate.toUTCString()}; path=/`
        navigate('/')
        window.location.reload()
      }else{
        message.error("Token is invalid!");
      }
      } 
      }
    }
  

  useEffect(() => {
    checkToken(token, email);
  }, [])
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] px-4">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="w-1/2 bg-gradient-to-r from-[#005199] to-[#0087FF] px-10 py-20 flex flex-col justify-center items-center text-white">
          <img src={NovalyaFullWhiteLogo} alt="Novalya Logo" />
          <p className="mt-4 text-2xl text-center font-semibold">#1 {t("login.Marketing Platform")}</p>
          <p className="text-2xl text-center font-semibold">{t("login.for Organic Lead Generation")}</p>
          <div className="mt-8">
            <img src={GlobeImg} alt="Globe" className="w-64 h-64" />
          </div>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-lg font-medium text-gray-600">{t("login.Welcome back!")} 👋</h2>
          <h1 className="text-2xl font-bold mt-2">{t("login.Login to your account")}</h1>

          <form className="mt-6" onSubmit={handleLogin}>
            <div>
              <label className="text-gray-600 text-sm font-semibold">{t("login.Email")} </label>
              <Input
                type="text"
                className="mt-2 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <label className="text-gray-600 text-sm font-semibold">{t("login.Password")}</label>
              <Input.Password
                className="py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              <div className="text-right mt-2">
                <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">
                   {t("login.Forgot Password?")}
                </a>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <Checkbox className="text-gray-600">{t("login.Remember me!")}</Checkbox>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-4 py-2 px-6 rounded text-sm !bg-[#0087FF] !border-none !text-white hover:!bg-[#0073E6] w-fit"
                disabled={isLoading}
              >
                {t("login.SIGN IN")}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
             {t("login.Not registered?")}{" "}
            <a href="#" className="text-blue-600 hover:underline">
               {t("login.Create an account")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
