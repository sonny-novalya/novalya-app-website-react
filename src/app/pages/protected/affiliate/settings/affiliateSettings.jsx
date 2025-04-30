import React, { useEffect, useState } from "react";
import "./affiliateSettings.css";
import AfiliateTopBar from "../../../../components/affilliate/shared/affiliateTopBar";
import { Button, Input, Select, Upload, message } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import adharFront from "../../../../../assets/img/adharBack.png";
import adharBack from "../../../../../assets/img/adharFront.png";
import useAffiliateStore from "../../../../../store/affiliate/affiliate";
import { countries } from "../../../../../helpers/helperData";

const AffiliateSettings = () => {
  const { uploadKYC, uploadBankDetails, getKycData } = useAffiliateStore();
  const [formData, setFormData] = useState({
    country: "",
    fullName: "",
    iban: "",
    bic: "",
    address: "",
    city: "",
    zipCode: "",
    bankCountry: "",
    bankAccountNumber: "",
    bankAccountSwiftCode: "",
    bankAccountRouting: "",
    type: "Bank",
  });
  const [errors, setErrors] = useState({});
  const [isEU, setIsEU] = useState(false);
  const [isPassport, setIsPassport] = useState(false);
  const [picPrev, setPicPrev] = useState({ front: null, back: null });
  const [loginUserData, setLoginUserData] = useState({});
  const [kycStat, setKycStat] = useState();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle select changes
  const handleSelectChange = (value, field) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({ ...errors, [field]: "" });
  };

  const handleUpload = (info, type) => {
    const file = info?.fileList[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type) {
        setPicPrev({ ...picPrev, front: e.target.result });
      } else {
        setPicPrev({ ...picPrev, back: e.target.result });
      }
    };
    reader.readAsDataURL(file.originFileObj);
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.bankCountry)
      newErrors.bankCountry = "Bank Country is required";
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.iban && isEU) newErrors.iban = "IBAN is required";
    if (!formData.bic && isEU) newErrors.bic = "BIC is required";
    if (!formData.bankAccountNumber && !isEU)
      newErrors.bankAccountNumber = "Bank Account Number is required";
    if (!formData.bankAccountSwiftCode && !isEU)
      newErrors.bankAccountSwiftCode = "Bank Account Swift Code is required";
    if (!formData.bankAccountRouting && !isEU)
      newErrors.bankAccountRouting = "Bank Account Routing is required";

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipCode) {
      newErrors.zipCode = "Zip Code is required";
    }
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const data = validateFormData(formData); // Remove unnecessary fields based on EU or non-EU country
      console.log("Submitted Data:", data);

      const res = await uploadBankDetails(data);

      if (res.status === 200) {
        message.success("Bank details been Updated");
      }
    } else {
      message.error("Please correct the errors before submitting.");
    }
  };

  const validateFormData = (data) => {
    if (isEU) {
      delete data.bankAccountNumber;
      delete data.bankAccountSwiftCode;
      delete data.bankAccountRouting;
    } else {
      delete data.iban;
      delete data.bic;
    }

    return data;
  };

  const handleKYCSubmit = async () => {
    const formDataVal = new FormData();
    const idenType = isPassport ? "Passport" : "Identity Card";
    formDataVal.append("identityType", idenType);

    if (idenType === "Passport") {
      if (!picPrev.front) {
        message.error("Add image of Passport");
        return; // Don't proceed with form submission
      } else {
        formDataVal.append("idcardFront", picPrev.front);
      }
    } else if (idenType === "Identity Card") {
      if (!picPrev.front || !picPrev.back) {
        message.error("Add images of ID card");
        return; // Don't proceed with form submission
      } else {
        formDataVal.append("idcardFront", picPrev.front);
        formDataVal.append("idcardBack", picPrev.back);
      }
    }

    const res = await uploadKYC(formDataVal);

    if (res.status === 200) {
      message.success("KYC details Uploaded");
    }
  };

  const checkKycData = async () => {
    const res = await getKycData();
    if (res.status === 200) {
      console.log(res?.data?.data);
      setLoginUserData(res?.data?.data);
    }
  };

  useEffect(() => {
    checkKycData();
  }, []);

  useEffect(() => {
    loginUserData?.user_data?.kyc_status === "Uploaded" &&
      setKycStat({ val: "Under Review", clr: "#fcba03" });

    loginUserData?.user_data?.kyc_status === "Unverified" &&
      setKycStat({ val: "Not Verified", clr: "" });

    loginUserData?.payout_info?.length > 0 &&
      loginUserData?.user_data?.kyc_status === "Unverified" &&
      setKycStat({ val: "Rejected", clr: "#ff0202" });

    loginUserData?.user_data?.kyc_status === "Verified" &&
      setKycStat({ val: "Verified", clr: "#35fc03" });
  }, [loginUserData]);

  return (
    <>
      <div className="p-6 bg-gray-100 h-screen overflow-auto">
        <AfiliateTopBar />
        <div className="flex gap-4">
          <div className="flex-1">
            {/* KYC Section */}
            <div className="bg-white px-5 py-7 rounded-[10px]">
              <div className="grid grid-cols-[40%_60%]  gap-4 items-center mb-6">
                <h4 className="font-medium text-[20px] leading-[150%]">
                  KYC Status
                </h4>
                <div>
                  <button
                    style={{
                      background: kycStat?.clr,
                      color: kycStat?.clr ? "white" : "#0087FF",
                      border: kycStat?.clr || "#0087FF",
                    }}
                    className="font-medium text-[14px] leading-[150%] border border-[#0087FF] text-[#0087FF] rounded-[6px] px-5 py-2.5"
                  >
                    {kycStat?.val || "Not Verified"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-[40%_60%]  gap-4 items-center mb-6">
                <h4 className="font-medium text-[20px] leading-[150%]">
                  Bank Review Status
                </h4>
                <div>
                  <button className="font-medium text-[14px] leading-[150%] border border-[#0087FF] text-[#0087FF] rounded-[6px] px-5 py-2.5">
                    Not Setup
                  </button>
                </div>
              </div>
              {loginUserData?.kyc_status === "Unverified" && (
                <>
                  <div className="grid grid-cols-[40%_60%]  gap-4 items-center">
                    <h4 className="font-medium text-[20px] leading-[150%]">
                      Start Verification Document
                    </h4>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-5">
                        <input
                          className="transform scale-[1.35]"
                          value={false}
                          onChange={() => {
                            setIsPassport(false);
                            setPicPrev({ front: null, back: null });
                          }}
                          checked={!isPassport}
                          type="radio"
                          id="ID-Card"
                          name="kyc-varification"
                        />
                        <label
                          className="ctm-label font-medium text-[14px] leading-[150%] bg-white text-[#0087FF] px-7 py-2.5 rounded-[6px] border border-[#0087FF] cursor-pointer"
                          for="ID-Card"
                        >
                          ID Card
                        </label>
                      </div>
                      <h5 className="font-medium text-[20px] leading-[150%] text-black">
                        Or
                      </h5>
                      <div className="flex items-center gap-5">
                        <input
                          className="transform scale-[1.35]"
                          value={true}
                          onChange={() => {
                            setIsPassport(true);
                            setPicPrev({ front: null, back: null });
                          }}
                          checked={isPassport}
                          type="radio"
                          id="Passport"
                          name="kyc-varification"
                        />
                        <label
                          className="ctm-label font-medium text-[14px] leading-[150%] bg-white text-[#0087FF] px-7 py-2.5 rounded-[6px] border border-[#0087FF] cursor-pointer"
                          for="Passport"
                        >
                          Passport
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-7">
                    <div>
                      <h6 className="font-normal text-[14px] leading-[150%] mb-[10px]">
                        Select {!isPassport ? "front" : ""} image
                      </h6>
                      <Upload
                        className="w-full ctm-upload"
                        showUploadList={false}
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={(value) => handleUpload(value, 1)}
                      >
                        <Button icon={<UploadOutlined />}>
                          Drag and Drop files here or Choose File
                        </Button>
                      </Upload>
                      <div className="flex items-center justify-between mt-[10px]">
                        <span className="text-[12px] leading-[150%] text-black/50">
                          Supported Format: JPEG, PNG, PDF
                        </span>
                        <span className="text-[12px] leading-[150%] text-black/50">
                          Maximum size: 5MB
                        </span>
                      </div>
                      <div className="p-6">
                        <img
                          className="border border-[#00000042] rounded-[12px] min-h-[125px] w-[350px] h-[200px]"
                          src={picPrev.front || adharFront}
                          alt="id-1"
                        ></img>
                      </div>
                    </div>
                    {!isPassport && (
                      <div>
                        <h6 className="font-normal text-[14px] leading-[150%] mb-[10px]">
                          Select back image
                        </h6>
                        <Upload
                          className="w-full ctm-upload"
                          showUploadList={false}
                          maxCount={1}
                          beforeUpload={() => false}
                          onChange={(value) => handleUpload(value, 0)}
                        >
                          <Button icon={<UploadOutlined />}>
                            Drag and Drop files here or Choose File
                          </Button>
                        </Upload>
                        <div className="flex items-center justify-between mt-[10px]">
                          <span className="text-[12px] leading-[150%] text-black/50">
                            Supported Format: JPEG, PNG, PDF
                          </span>
                          <span className="text-[12px] leading-[150%] text-black/50">
                            Maximum size: 5MB
                          </span>
                        </div>
                        <div className="p-6">
                          <img
                            className="border border-[#00000042] rounded-[12px] min-h-[125px] w-[350px] h-[200px]"
                            src={picPrev.back || adharBack}
                            alt="id-1"
                          ></img>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => handleKYCSubmit()}
                      className="bg-[#21BF7C] font-[Outfit] font-medium text-[14px] leading-[150%] text-white px-9 py-2.5 rounded-[6px] cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}

              <div className="border border-dashed border-[#0087FF] bg-[#0087FF33] rounded-[10px] mt-[20px] px-[30px] py-[20px] flex items-center gap-[16px]">
                <InfoCircleOutlined className="affi-svg" />
                <span className="font-medium text-[14px] leading-[150%] text-[#0087FF]">
                  {loginUserData?.user_data?.kyc_status === "Uploaded" &&
                    " You have successfully uploaded your documents. It will be verify soon."}
                  {loginUserData?.user_data?.kyc_status === "Unverified" &&
                    " Please verify your KYC to set up your payment method for payouts."}
                  {loginUserData?.payout_info?.length > 0 &&
                  loginUserData?.user_data?.kyc_status === "Unverified"
                    ? `Your KYC request has been rejected : ${loginUserData?.payout_info[0]?.reason}`
                    : null}
                </span>
              </div>

              {loginUserData?.user_data?.bank_account_title === null &&
                loginUserData?.user_data?.outside_bank_account_title ===
                  null && (
                  /* && loginUserData?.porequestcount === 0 */
                  <>
                    {" "}
                    <h4 class="font-medium text-[20px] leading-[150%] my-4 ">
                      Payment Information
                    </h4>
                    <div
                      className="flex items-center gap-5"
                      onChange={(e) => setIsEU(JSON.parse(e.target.value))}
                    >
                      <div className="flex items-center gap-5">
                        <input
                          className="transform scale-[1.35]"
                          value={true}
                          type="radio"
                          id="Europe"
                          name="country"
                          checked={isEU}
                        />
                        <label
                          className="ctm-label font-medium text-[14px] leading-[150%] bg-white text-[#0087FF] px-7 py-2.5 rounded-[6px] border border-[#0087FF] cursor-pointer"
                          for="Europe"
                        >
                          Europe
                        </label>
                      </div>
                      <div className="flex items-center gap-5">
                        <input
                          className="transform scale-[1.35]"
                          value={false}
                          type="radio"
                          id="Outside-EU"
                          name="country"
                          checked={!isEU}
                        />
                        <label
                          className="ctm-label font-medium text-[14px] leading-[150%] bg-white text-[#0087FF] px-7 py-2.5 rounded-[6px] border border-[#0087FF] cursor-pointer"
                          for="Outside-EU"
                        >
                          Outside EU
                        </label>
                      </div>
                    </div>
                    <div className="border border-dashed border-[#0087FF] bg-[#0087FF33] rounded-[10px] mt-[20px] px-[30px] py-[20px] flex items-center gap-[16px]">
                      <InfoCircleOutlined className="affi-svg" />
                      <span className="font-medium text-[14px] leading-[150%] text-[#0087FF]">
                        Payment are made in Euro and EUR 5 will be deduct as fee
                        of the process. Receiver bank may take some fees.
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-[20px] font-semibold mb-4">
                        Bank Details
                      </h2>
                      <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                        {/* Bank Country */}
                        <div>
                          <label className="text-[14px] leading-[150%] mb-[10px] block">
                            Bank Account Country
                          </label>
                          <Select
                            placeholder="Select Country"
                            className="w-full ctm-select"
                            onChange={(value) =>
                              handleSelectChange(value, "bankCountry")
                            }
                            value={formData.bankCountry}
                            options={countries.map((item) => ({
                              label: (
                                <span>
                                  <img
                                    loading="lazy"
                                    style={{ width: 25, marginRight: 8 }}
                                    src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                                    alt=""
                                  />
                                  {item.label} ({item.code})
                                </span>
                              ),
                              value: item.label,
                            }))}
                            optionLabelProp="label"
                          />
                          {errors.bankCountry && (
                            <p className="text-red-500 text-xs mt-3">
                              {errors.bankCountry}
                            </p>
                          )}
                        </div>

                        {/* Full Name */}
                        <div>
                          <label className="text-[14px] leading-[150%] mb-[10px] block">
                            Your Full Name
                          </label>
                          <Input
                            name="fullName"
                            className="ctm-input"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                          {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {isEU ? (
                          <>
                            {/* IBAN */}
                            <div>
                              <label className="text-[14px] leading-[150%] mb-[10px] block">
                                Bank Account IBAN
                              </label>
                              <Input
                                name="iban"
                                className="ctm-input"
                                value={formData.iban}
                                onChange={handleChange}
                              />
                              {errors.iban && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.iban}
                                </p>
                              )}
                            </div>

                            {/* BIC */}
                            <div>
                              <label className="text-[14px] leading-[150%] mb-[10px] block">
                                Bank Account BIC
                              </label>
                              <Input
                                name="bic"
                                className="ctm-input"
                                value={formData.bic}
                                onChange={handleChange}
                              />
                              {errors.bic && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.bic}
                                </p>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Bank Account Number */}
                            <div>
                              <label className="text-[14px] leading-[150%] mb-[10px] block">
                                Bank Account Number
                              </label>
                              <Input
                                name="bankAccountNumber"
                                className="ctm-input"
                                value={formData.bankAccountNumber}
                                onChange={handleChange}
                              />
                              {errors.bankAccountNumber && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.bankAccountNumber}
                                </p>
                              )}
                            </div>

                            {/* Bank Account Swift Code */}
                            <div>
                              <label className="text-[14px] leading-[150%] mb-[10px] block">
                                Bank Account Swift Code
                              </label>
                              <Input
                                name="bankAccountSwiftCode"
                                className="ctm-input"
                                value={formData.bankAccountSwiftCode}
                                onChange={handleChange}
                              />
                              {errors.bankAccountSwiftCode && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.bankAccountSwiftCode}
                                </p>
                              )}
                            </div>
                            {/*Bank Account Routing */}

                            <div>
                              <label className="text-[14px] leading-[150%] mb-[10px] block">
                                Bank Account Routing
                              </label>
                              <Input
                                name="bankAccountRouting"
                                className="ctm-input"
                                value={formData.bankAccountRouting}
                                onChange={handleChange}
                              />
                              {errors.bankAccountRouting && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.bankAccountRouting}
                                </p>
                              )}
                            </div>
                          </>
                        )}

                        {/* Address */}
                        <div>
                          <label className="text-[14px] leading-[150%] mb-[10px] block">
                            Personal Address
                          </label>
                          <Input
                            name="address"
                            className="ctm-input"
                            value={formData.address}
                            onChange={handleChange}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        {/* City */}
                        <div>
                          <label className="text-[14px] leading-[150%] mb-[10px] block">
                            City
                          </label>
                          <Input
                            name="city"
                            className="ctm-input"
                            value={formData.city}
                            onChange={handleChange}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        {/* Zip Code */}
                        <div>
                          <label className="text-[14px] leading-[150%] mb-[10px] block">
                            Zip Code
                          </label>
                          <Input
                            name="zipCode"
                            className="ctm-input"
                            value={formData.zipCode}
                            onChange={handleChange}
                          />
                          {errors.zipCode && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.zipCode}
                            </p>
                          )}
                        </div>

                        {/* Country */}
                        <div>
                          <label className="text-[14px] leading-[150%] mb-[10px] block">
                            Country
                          </label>
                          <Input
                            name="country"
                            className="ctm-input"
                            value={formData.country}
                            onChange={handleChange}
                          />
                          {errors.country && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.country}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="primary"
                        className="mt-4 !bg-[#21BF7C] font-medium text-[14px] leading-[150%] !px-[30px] !py-[10px] !min-h-[40px]"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                )}
            </div>
          </div>
          <div className="bg-[#0087FF33] border border-[#0087FF] rounded-[10px] p-5 h-[250px] flex flex-col justify-center items-center gap-4">
            <h3 className="font-medium text-[20px] leading-[150%]">
              Documents
            </h3>
            <button className="font-medium text-[14px] leading-[150%] bg-[#0087FF] border border-[#0087FF] text-white w-full px-8 py-2.5 rounded-md cursor-pointer">
              Affiliate Agreement
            </button>
            <button className="font-medium text-[14px] leading-[150%] bg-[#0087FF] border border-[#0087FF] text-white w-full px-8 py-2.5 rounded-md cursor-pointer">
              Compensation Plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliateSettings;
