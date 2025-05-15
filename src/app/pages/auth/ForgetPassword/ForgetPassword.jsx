import { useState } from "react";
import logo from "../../../../../src/assets/img/novalya-blue.png";
import NovaBlue from "../../../../../src/assets/img/nova-blur.png";
import { Input, message, Spin } from "antd";
import useAuthStore from "../../../../store/auth/auth-store";
import { useNavigate } from "react-router-dom";
import EmailSent from "../../../components/forgetPass/emailSent";

const ForgetPassword = () => {
    const { forgetPass } = useAuthStore();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (!email) {
            message.error("Email is required!");
            return;
        }
        setIsLoading(true);
        const res = await forgetPass({ email: email });
        if (res.status === 200) {
            message.success("Check your Inbox");
            setEmailSent(true);
        }
        setIsLoading(false);
    };

    return (
        <>
            {emailSent ? (
                <EmailSent />
            ) : (
                <div className="flex flex-col min-h-screen bg-white px-4">
                    <div className="p-5">
                        <img src={logo} alt="logo" className="h-12" />
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center relative overflow-hidden">
                        <img
                            src={NovaBlue}
                            alt="blur-bg"
                            className="h-52 opacity-50 absolute left-0 bottom-0 pointer-events-none select-none"
                        />
                        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl z-10 ">
                            <h1 className="text-2xl font-bold mt-2">Forgot Password</h1>
                            <p className="text-[#757575]">Enter your email address</p>

                            <form className="mt-6" onSubmit={submit}>
                                <div>
                                    <label className="text-gray-600 text-sm font-semibold">
                                        Email
                                    </label>
                                    <Input
                                        type="text"
                                        className="mt-2 py-2"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                        className="mt-6 py-2 w-full px-6 rounded text-sm !bg-[#0087FF] cursor-pointer !border-none !text-white hover:!bg-[#0073E6]"
                                >
                                    {isLoading ? (
                                        <Spin size="small" style={{ color: "white" }} />
                                    ) : (
                                        "SUBMIT"
                                    )}
                                </button>
                            </form>
                        </div>
                            <span
                                onClick={() => navigate("/login")}
                                className="block text-center text-[#0066FF] hover:underline font-semibold mt-6 text-lg cursor-pointer"
                            >
                                Back to Login
                            </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default ForgetPassword;
