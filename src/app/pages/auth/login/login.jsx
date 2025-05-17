import { useEffect, useState } from "react";
import { Input, Checkbox, message,Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import GlobeImg from "../../../../../src/assets/img/globe.png";
import NovalyaFullWhiteLogo from "../../../../../src/assets/img/NovalyaFullWhiteLogo.png";
import {  manualSignIn } from "../../../../services/ApiCalls";
import { loginSenerios, removeAllCookies } from "../../../../helpers/helper";
import {useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiCall from "../../../../services/api";
import "../auth.css"

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
      const response = await apiCall({
        method: 'POST',
        url: '/user/api/login',
        data: creds,
        auth: false,
      });

      console.log(response, "response");

      if (response?.status === 200) {
        removeAllCookies();
        loginSenerios(response?.data);  // Corrected potential typo here
      } else {
        message.error("Login failed!");  // Simplified the error handling here
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // Added specific error handling for the catch block
      message.error(error?.message || "An unexpected error occurred!");
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
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] p-6  login_parent ">
      <div className="flex w-full max-w-[875px] rounded-[10px] shadow-lg overflow-hidden bg-white">
        <div className="w-1/2 bg-gradient-to-r from-[#005199] to-[#0087FF] px-10 py-14 flex flex-col justify-center items-center text-white">
          <img src={NovalyaFullWhiteLogo} alt="Novalya Logo" />
          <p className="mt-4 text-[26px] text-center font-[500]">#1 {t("login.Marketing Platform")}</p>
          <p className="text-[26px] text-center font-[500]">{t("login.for Organic Lead Generation")}</p>
          <div className="mt-6">
            <img src={GlobeImg} alt="Globe" className="w-full" />
          </div>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="w-full max-w-[300px] mx-auto">
            <h2 className="text-[14px] text-[#757575] mb-1">{t("login.Welcome back!")} 👋</h2>
            <h1 className="text-[#333333] font-semibold text-[22px] mt-1">{t("login.Login to your account")}</h1>

            <form className="mt-8" onSubmit={handleLogin}>
              <div>
                <label className="text-[16px] font-normal mb-[6px]">{t("login.Email")} </label>
                <Input
                  type="text"
                  className="bg-[#F2F2F2] border border-[#00000033] rounded-[10px] text-[16px] p-[10px] min-h-[48px]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="text-[16px] font-normal mb-[6px]">{t("login.Password")}</label>
                <Input.Password
                  className="bg-[#F2F2F2] border border-[#00000033] rounded-[10px] text-[16px] p-[10px] min-h-[48px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <div className="text-right mt-.5">
                  <a href="/forgot-password" className="text-[12px] italic text-[#0087FF] hover:underline">
                    {t("login.Forgot Password?")}
                  </a>
                </div>
              </div>

           

              <div className="flex items-center justify-center mt-7">
                <button
                  type="submit"
                  className="text-[16px] py-3 px-10 rounded-[6px] cursor-pointer submit-btn !bg-[#0087FF] !border-none !text-white hover:!bg-[#0073E6] w-fit"
                  disabled={isLoading}
                >
                {
                  isLoading ? <Spin size="small" style={{color:"white"}}/>  :t("login.SIGN IN")
                }
                
                </button>
              </div>
            </form>

            <p className="text-center text-[#333333] text-[12px] mt-4">
              {t("login.Not registered?")}{" "}
              <span onClick={()=>navigate("/plans")} className="text-blue-600 font-semibold underline">
                {t("login.Create an account")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
