import { useState } from "react";
import NovalyaFullWhiteLogo from "../../../../../src/assets/img/NovalyaFullWhiteLogo.png";
import lockImg from "../../../../../src/assets/img/securityLock.png";
import { Input } from "antd";
const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] px-4">
            <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden bg-white">
                <div className="w-1/2 bg-gradient-to-r from-[#005199] to-[#0087FF] px-10 py-20 flex flex-col justify-center items-center text-white">
                    <img src={NovalyaFullWhiteLogo} alt="Novalya Logo" />
                    
                    <div className="mt-8">
                        <img src={lockImg} alt="Globe" className="w-64 h-64" />
                    </div>
                </div>

                <div className="w-1/2 p-10 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mt-2">Forgot Password</h1>

                    <form className="mt-6" >
                        <div>
                            <label className="text-gray-600 text-sm font-semibold">Email</label>
                            <Input
                                type="text"
                                className="mt-2 py-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="mt-4 py-2 px-6 rounded text-sm !bg-[#0087FF] !border-none !text-white hover:!bg-[#0073E6] w-fit"
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        Don&apos;t want to reset?{' '}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
