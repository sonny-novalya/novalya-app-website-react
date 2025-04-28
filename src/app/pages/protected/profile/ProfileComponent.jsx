import { useEffect, useRef, useState } from 'react';
import { EditOutlined, PhoneOutlined } from '@ant-design/icons';
import { countries } from '../../../../helpers/helperData';

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

    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        address: 'H.no 1',
        country: 'India',
        city: 'Delhi',
        phone: '8570887999',
        postal: '110006',
        state: 'Delhi',
    });

    const [selectedCountry, setSelectedCountry] = useState({
        code: 'US',
        phone: '1',
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const countryDropdownRef = useRef(null);
    const addressInputRef = useRef(null);

    const toggleEdit = (field) => {
        setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

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
                    <div>
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
                    </div>

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
            </div>
        </div>
    );
};

export default ProfileComponent;
