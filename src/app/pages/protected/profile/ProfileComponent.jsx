import React, { useState } from 'react';
import { Input } from 'antd';
import { EditOutlined, PhoneOutlined } from '@ant-design/icons';

const ProfileComponent = () => {
    const [editFields, setEditFields] = useState({
        firstName: false,
        lastName: false,
        address: false,
        country: false,
        city: false,
        phone: false,
        postal: false,
        state: false,
    });

    const toggleEdit = (field) => {
        setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="bg-white p-5 rounded-md rounded-tl-none shadow-md border border-[#0087FF33]">
            {/* Email */}
            <p className="text-gray-600 text-[16px] mb-4">
                <span className="font-semibold">Email :</span> Test.novalya.com
            </p>

            {/* Profile Info */}
            <div className="border border-[#DADADA] p-5 rounded-md">
                {/* Profile Image and Name */}
                <div className="flex items-center mb-8">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                            📷
                        </div>
                        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                            <EditOutlined className="text-white text-xs" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold ml-4">John Doe</h2>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* First Name */}
                    <div>
                        <p className="text-gray-600 mb-1">First name</p>
                        <Input
                            defaultValue="John"
                            suffix={
                                <EditOutlined
                                    className="cursor-pointer"
                                    onClick={() => toggleEdit('firstName')}
                                />
                            }
                            className={`${editFields.firstName ? 'border-[#0087FF]' : 'border-blue-500'} focus:shadow-none`}
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <p className="text-gray-600 mb-1">Last name</p>
                        <Input
                            defaultValue="Doe"
                            suffix={
                                <EditOutlined
                                    className="cursor-pointer"
                                    onClick={() => toggleEdit('lastName')}
                                />
                            }
                            className={`${editFields.lastName ? 'border-[#0087FF]' : 'border-blue-500'} focus:shadow-none`}
                        />
                    </div>

                    <div></div>

                    {/* Country */}
                    <div>
                        <p className="text-gray-600 mb-1">Country</p>
                        <Input
                            defaultValue="India"
                            suffix={
                                <EditOutlined
                                    className="cursor-pointer"
                                    onClick={() => toggleEdit('country')}
                                />
                            }
                            className={`${editFields.country ? 'border-[#0087FF]' : 'border-blue-500'} focus:shadow-none`}
                        />
                    </div>

                    {/* City */}
                    <div>
                        <p className="text-gray-600 mb-1">City</p>
                        <Input
                            defaultValue="Delhi"
                            suffix={
                                <EditOutlined
                                    className="cursor-pointer"
                                    onClick={() => toggleEdit('city')}
                                />
                            }
                            className={`${editFields.city ? 'border-[#0087FF]' : 'border-blue-500'} focus:shadow-none`}
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <p className="text-gray-600 mb-1">Address</p>
                        <Input
                            defaultValue="H.no 1"
                            suffix={
                                <EditOutlined
                                    className="cursor-pointer"
                                    onClick={() => toggleEdit('address')}
                                />
                            }
                            className={`${editFields.address ? 'border-[#0087FF]' : 'border-blue-500'} focus:shadow-none`}
                        />
                    </div>

                    {/* Postal Code */}
                    <div>
                        <p className="text-gray-600 mb-1">Postal code</p>
                        <Input
                            defaultValue="110006"
                            suffix={
                                <EditOutlined
                                    className="cursor-pointer"
                                    onClick={() => toggleEdit('postal')}
                                />
                            }
                            className={`${editFields.postal ? 'border-[#0087FF]' : 'border-blue-500'} focus:shadow-none`}
                        />
                    </div>

                    {/* State/Province */}
                    <div>
                        <p className="text-gray-600 mb-1">State/Province</p>
                        <Input
                            defaultValue="Delhi"
                            suffix={
                                <EditOutlined
                                    className="cursor-pointer"
                                    onClick={() => toggleEdit('state')}
                                />
                            }
                            className={`${editFields.state ? 'border-[#0087FF]' : 'border-blue-500'} focus:shadow-none`}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <p className="text-gray-600 mb-1">Phone number</p>
                        <Input
                            addonBefore={
                                <div className="flex items-center">
                                    <img
                                        src="https://flagcdn.com/w40/in.png"
                                        alt="flag"
                                        className="w-5 h-5 mr-1"
                                    />
                                </div>
                            }
                            defaultValue="+918570887999"
                            suffix={
                                <PhoneOutlined
                                    className="cursor-pointer"
                                    onClick={() => toggleEdit('phone')}
                                />
                            }
                            className={`${editFields.phone ? 'border-[#0087FF]' : 'border-blue-500'} focus:shadow-none`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
