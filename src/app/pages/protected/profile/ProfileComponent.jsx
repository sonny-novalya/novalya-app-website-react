import { useEffect, useRef, useState } from 'react';
import { EditOutlined, PhoneOutlined } from '@ant-design/icons';
import { countries } from '../../../../helpers/helperData';
import useProfileStore from '../../../../store/profile/profile';
import PropTypes from 'prop-types';
import { message, Spin } from 'antd';
import { CameraIcon } from '../../common/icons/icons';

const ProfileComponent = ({ loginUserData, userDataLoading }) => {
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

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        country: '',
        city: '',
        phone: '',
        postal: '',
        state: '',
    });

    const [selectedCountry, setSelectedCountry] = useState({
        code: 'us',
        phone: '1',
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { updateUserProfile, loading, updateProfilePicture } = useProfileStore();  

    const countryDropdownRef = useRef(null);
    const addressInputRef = useRef(null);
    const photoDropdownRef = useRef(null);
    const fileInputRef = useRef(null);

    const [showPhotoDropdown, setShowPhotoDropdown] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(null);

    const toggleEdit = (field) => {
        setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const getChangedFields = () => {
        const updatedFields = {};
        if (formData.firstName !== loginUserData.firstname) {
            updatedFields.firstname = formData.firstName;
        }
        if (formData.lastName !== loginUserData.lastname) {
            updatedFields.lastname = formData.lastName;
        }
        if (formData.phone !== loginUserData.mobile) {
            updatedFields.mobile = formData.phone;
        }
        if (formData.postal !== loginUserData.zip_code) {
            updatedFields.zip_code = formData.postal;
        }
        if (formData.address !== loginUserData.address1) {
            updatedFields.address1 = formData.address;
        }

        const selectedCountryCode = selectedCountry.code.toUpperCase();
        if (selectedCountryCode !== loginUserData.country) {
            updatedFields.country = selectedCountryCode;
        }

        if (formData.city !== loginUserData.city) {
            updatedFields.city = formData.city;
        }
        return updatedFields;
    };

    const handleSubmit = async () => {
        const changedFields = getChangedFields();

        if (Object.keys(changedFields).length === 0) {
            message.error("No changes detected.");
            return;
        }

        try {
            await updateUserProfile(changedFields);
            setEditFields({
                firstName: false,
                lastName: false,
                address: false,
                country: false,
                city: false,
                phone: false,
                postal: false,
                state: false,
            });
            // message.success("Profile updated successfully!");
        } catch (error) {
            console.error("Profile update failed:", error);
            message.error("Failed to update profile. Please try again.");
        }
    };

    const handleProfileImageUpload = () => {
        if (!selectedFile) {
            message.error("Please select an image file first.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64Image = reader.result;

            try {
                const payload = {
                    image: base64Image
                };

                await updateProfilePicture(payload);

                message.success("Profile picture updated successfully");

                setShowPhotoDropdown(false);
                setSelectedFile(null);
                setSelectedFileName('');

            } catch (err) {
                console.error("Error uploading base64 image:", err);
                message.error("Failed to upload image");
            }
        };

        reader.readAsDataURL(selectedFile);
    };

    useEffect(() => {
        if (loginUserData) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                firstName: loginUserData.firstname || '',
                lastName: loginUserData.lastname || '',
                phone: loginUserData.mobile || '',
                postal: loginUserData.zip_code || '',
                address: loginUserData.address1 || '',
                country: countries.find((item) => item.code === loginUserData.country)?.label || loginUserData.country,
                city: loginUserData.city,
            }));

            const countryData = countries.find((item) => item.code === loginUserData.country) 

            if (countryData) {
                setSelectedCountry({
                    code: countryData.code,
                    phone: countryData.phone,
                });
            }
        }
    }, [loginUserData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (photoDropdownRef.current && !photoDropdownRef.current.contains(event.target)) {
                setShowPhotoDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleLoad = () => {
            const input = addressInputRef.current;
            if (!input || !window.google) return;

            const autocomplete = new window.google.maps.places.Autocomplete(input, {
                types: ["geocode"],
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) return;

                handleChange('address', place.formatted_address);

                const addressComponents = place.address_components || [];

                const city = addressComponents.find((component) =>
                    component.types.includes("locality")
                );
                const zipCode = addressComponents.find((component) =>
                    component.types.includes("postal_code")
                );
                const countryComponent = addressComponents.find((component) =>
                    component.types.includes("country")
                );

                if (city) handleChange('city', city.long_name);
                if (zipCode) handleChange('postal', zipCode.long_name);
                if (countryComponent) {
                    const selected = countries.find(
                        (country) =>
                            country.code.toLowerCase() === countryComponent.short_name.toLowerCase()
                    );
                    setSelectedCountry(selected || { code: 'US', phone: '1' });
                    handleChange('country', selected ? selected.label : countryComponent.long_name);
                }
            });
        };

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCfYReauVWsdFbjZntfrcPOn4V7VB27WN0&libraries=places`;
        script.async = true;
        script.onload = () => {
            handleLoad();
        };
        document.body.appendChild(script);

        // Optionally set country from IP
        fetch("https://ipapi.co/json/")
            .then((response) => response.json())
            .then((data) => {
                if (data.country_code) {
                    const newCountry = countries.find(
                        (country) => country.code === data.country_code
                    );
                    if (newCountry) {
                        setSelectedCountry(newCountry);
                        handleChange('country', newCountry.label);
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching IP address:", error);
            });
    }, []);

    const imgUrl = loginUserData?.profilepictureurl?.includes("https://stagingbackend.novalya.com")
        ? loginUserData.profilepictureurl.replace("https://stagingbackend.novalya.com", "https://api-v2.novalya.com")
        : loginUserData.profilepictureurl

    return (
        <div className="bg-white p-5 rounded-md rounded-tl-none shadow-md border border-[#0087FF33]">
            {/* Email */}
            <p className="text-gray-600 text-[16px] mb-4">
                <span className="font-semibold">Email :</span> {loginUserData?.email}
            </p>

            {/* Profile Info */}
            <div className="border border-[#DADADA] p-5 rounded-md relative">
                {userDataLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg h-full">
                        <Spin size="large" />
                    </div>
                )}
                {/* Profile Image and Name */}
                <div className="flex items-center">

                    <div className="relative">
                        <img src={imgUrl} alt="" className='w-40 h-40 rounded-full'/>
                        <div className="absolute bottom-4 right-0 w-10 border-2 border-white rounded-full">
                            <div onClick={() => setShowPhotoDropdown(!showPhotoDropdown)} className="cursor-pointer">
                                <CameraIcon />
                            </div>

                            {showPhotoDropdown && (
                                <div
                                    ref={photoDropdownRef}
                                    className="absolute top-5 left-10 w-[320px] bg-white rounded-lg shadow-lg border border-[#DADADA] p-4 z-50"
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <img
                                            src={imgUrl}
                                            alt="Preview"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <p className="font-semibold text-gray-800">{loginUserData?.firstname}</p>
                                    </div>

                                    <div className="flex items-center border rounded-md overflow-hidden mb-4">
                                        <label
                                            htmlFor="profileImageInput"
                                            className="bg-white px-4 py-2 text-sm font-semibold text-black border-r border-gray-200 cursor-pointer"
                                        >
                                            Choose File
                                        </label>
                                        <span className="flex-1 px-3 text-gray-600 text-sm truncate">
                                            {selectedFileName || 'No file selected'}
                                        </span>
                                        <div
                                            className="bg-green-100 p-2 cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <CameraIcon />
                                        </div>
                                        <input
                                            type="file"
                                            id="profileImageInput"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setSelectedFile(file);
                                                    setSelectedFileName(file.name);
                                                }
                                            }}
                                        />

                                    </div>

                                    <button
                                        onClick={handleProfileImageUpload}
                                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            )}

                        </div>

                    </div>
                    <h2 className="text-2xl font-semibold ml-4">{`${loginUserData?.firstname} ${loginUserData?.lastname}`}</h2>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6" >
                    {/* First Name */}
                    <div>
                        <p className="text-gray-600 mb-1">First name</p>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                disabled={!editFields.firstName}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${editFields.firstName ? 'border-[#0087FF]' : 'border-[#DADADA]'
                                    }`}
                            />
                            <EditOutlined
                                onClick={() => toggleEdit('firstName')}
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div>
                        <p className="text-gray-600 mb-1">Last name</p>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                disabled={!editFields.lastName}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${editFields.lastName ? 'border-[#0087FF]' : 'border-[#DADADA]'
                                    }`}
                            />
                            <EditOutlined
                                onClick={() => toggleEdit('lastName')}
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div></div> {/* Empty div to keep grid alignment */}

                    {/* Country */}
                    <div>
                        <p className="text-gray-600 mb-1">Country</p>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                disabled={!editFields.country}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${editFields.country ? 'border-[#0087FF]' : 'border-[#DADADA]'
                                    }`}
                            />
                            <EditOutlined
                                onClick={() => toggleEdit('country')}
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* City */}
                    <div>
                        <p className="text-gray-600 mb-1">City</p>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                disabled={!editFields.city}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${editFields.city ? 'border-[#0087FF]' : 'border-[#DADADA]'
                                    }`}
                            />
                            <EditOutlined
                                onClick={() => toggleEdit('city')}
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <p className="text-gray-600 mb-1">Address</p>
                        <div className="relative">
                            <input
                                id="address"
                                ref={addressInputRef}
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                disabled={!editFields.address}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${editFields.address ? 'border-[#0087FF]' : 'border-[#DADADA]'
                                    }`}
                            />
                            <EditOutlined
                                onClick={() => toggleEdit('address')}
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Postal Code */}
                    <div>
                        <p className="text-gray-600 mb-1">Postal code</p>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.postal}
                                onChange={(e) => handleChange('postal', e.target.value)}
                                disabled={!editFields.postal}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${editFields.postal ? 'border-[#0087FF]' : 'border-[#DADADA]'
                                    }`}
                            />
                            <EditOutlined
                                onClick={() => toggleEdit('postal')}
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* State/Province */}
                    {/* <div>
                        <p className="text-gray-600 mb-1">State/Province</p>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.state}
                                onChange={(e) => handleChange('state', e.target.value)}
                                disabled={!editFields.state}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${editFields.state ? 'border-[#0087FF]' : 'border-[#DADADA]'
                                    }`}
                            />
                            <EditOutlined
                                onClick={() => toggleEdit('state')}
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div> */}

                    {/* Phone Number */}
                    <div>
                        <p className="text-gray-600 mb-1">Phone number</p>
                        <div className="relative flex items-center">
                            {dropdownOpen && (
                                <div ref={countryDropdownRef} className="absolute bottom-0 right-[350px] w-60 max-h-80 overflow-y-scroll bg-white border border-[#DADADA] rounded-md shadow-2xl z-50">
                                    {countries.map((country) => (
                                        <div
                                            key={country.code}
                                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSelectedCountry({ code: country.code, phone: country.phone });
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <img
                                                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                                alt={country.label}
                                                className="w-6 h-4 mr-2"
                                            />
                                            <span className="text-sm">{country.label} </span>
                                            <span className="text-sm ml-auto">(+{country.phone})</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedCountry.code && (
                                <div
                                    ref={countryDropdownRef}
                                    className="flex items-center px-2 py-2.5 border border-[#DADADA] rounded-l-md bg-gray-100 cursor-pointer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                        <img
                                            src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                                            alt="flag"
                                            className="w-8 h-5 rounded"
                                        />
                                </div>
                            )}

                            <input
                                type="text"
                                value={`+${selectedCountry.phone} ${formData.phone}`}
                                onChange={(e) => handleChange('phone', e.target.value.replace(`+${selectedCountry.phone} `, ''))}
                                disabled={!editFields.phone}
                                className={`w-full px-3 py-2 border-t border-b border-r rounded-r-md focus:outline-none ${editFields.phone ? 'border-[#0087FF]' : 'border-[#DADADA]'}`}
                            />
                            <PhoneOutlined
                                onClick={() => toggleEdit('phone')}
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>
                    
                </div>
                <div className="flex items-center justify-between">
                    <button></button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !Object.values(editFields).some(Boolean)}
                        className={`bg-blue-500 text-white px-8 py-2 rounded-md transition ${loading || !Object.values(editFields).some(Boolean)
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-blue-600'
                            }`}
                    >
                        {loading ? 'Updating...' : 'Submit'}
                    </button>

                </div>
            </div>
        </div>
    );
};

ProfileComponent.propTypes = {
    userDataLoading: PropTypes.Boolean,
    loginUserData: PropTypes.shape({
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        mobile: PropTypes.string,
        zip_code: PropTypes.string,
        address1: PropTypes.string,
        country: PropTypes.string,
        city: PropTypes.string,
        profilepictureurl: PropTypes.string,
    }).isRequired,
};

export default ProfileComponent;
