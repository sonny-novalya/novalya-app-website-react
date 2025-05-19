import { useEffect, useState } from "react";
import { Input, message, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../../../store/auth/auth-store";
import PassChanged from "../../../components/forgetPass/passChanged";
import logo from "../../../../../src/assets/img/novalya-blue.png";
import NovaBlue from "../../../../../src/assets/img/nova-blur.png";

const ResetPassword = () => {
  const { validateEmailToken, resetPass } = useAuthStore();
  const { token, email } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setChanged] = useState(false)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const checkToken = async () => {
    const payload = {
      token, email
    }
    const res = await validateEmailToken(payload)



    if (res.status === 200) {
      setValidToken(true);
    } else {
      setValidToken(false);
    }
  }


  const submitPass = async () => {
    if (newPassword !== confirmPassword) {

      message.error("Passwords do not match!")
      return
    }
    setIsLoading(true)

    const res = await resetPass({ email, password: newPassword })

    if (res.status === 200) {
      message.success("Password has been changed")
      setChanged(true)
    }
    setIsLoading(false)

  }
  useEffect(() => {
    checkToken();
  }, []);



  return (
    <>
      {isChanged ? (
        <PassChanged />
      ) : (
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
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl z-10">
              <h1 className="text-2xl font-bold mt-2">Change Password</h1>
              <p className="text-[#757575]">Enter your new password</p>

              <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="text-gray-600 text-sm font-semibold">
                    New Password
                  </label>
                  <Input.Password
                    placeholder="Enter new password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2 py-2"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm font-semibold">
                    Confirm Password
                  </label>
                  <Input.Password
                    placeholder="Confirm password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 py-2"
                  />
                </div>

                <button
                  type="submit"
                  onClick={submitPass}
                  disabled={!validToken || isLoading}
                  className="mt-6 py-2 w-full px-6 rounded text-sm !bg-[#0087FF] cursor-pointer !border-none !text-white hover:!bg-[#0073E6]"
                >
                  {isLoading ? <Spin size="small" style={{ color: "white" }} /> : "SUBMIT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
