import React, { useEffect, useRef, useState } from "react";
import propSearch from "../../../assets/img/pros-serach-icon.svg";
import prospWhite from "../../../assets/img/prospection-white.svg";
import messangerIcon from "../../../assets/img/messanger.svg";
import messangerWhite from "../../../assets/img/messenger-white.svg";
import BdayIcon from "../../../assets/img/birth_cake.svg";
import BdayWhite from "../../../assets/img/birth_cake-white.svg";
import requestIcon from "../../../assets/img/user-add-fill.svg";
import requestWhite from "../../../assets/img/user-fill-white.svg";
import IgCrm from "../../../assets/img/ig-messnger.svg";
import IgCrmWhite from "../../../assets/img/messenger-white.svg";
import IgProsp from "../../../assets/img/ig-prospection.svg";
import pencilIcon from "../../../assets/img/pencil.svg";
import scissorsIcon from "../../../assets/img/scissors.svg";
import paintbrushIcon from "../../../assets/img/paintbrush.svg";
import framedPictureIcon from "../../../assets/img/framed-picture.svg";
import backHandIcon from "../../../assets/img/backhand-down.svg";
import rasingHandIcon from "../../../assets/img/raising-hands.svg";
import smilingFace from "../../../assets/img/smiling-face.svg";
import smilingFaceGlasses from "../../../assets/img/smiling-face-glasses.svg";
import "./message.css";
import useMessageSteps from "../../../store/messageTemp/MessageTemp";
import EmojiPicker from "emoji-picker-react";
import { CreateMessageIcon } from "../../pages/common/icons/messageIcons/MessageIcons";
import { useTranslation } from "react-i18next";
import { DeleteFillRedIcon } from "../../pages/common/icons/icons";
import apiCall from "../../../services/api";
import { message, Spin } from "antd";
import Upload from "./upload";
import { useLocation } from "react-router-dom";

const CreateMessage = ({containerRef}) => {
  const {
    setStep,
    setIsMessage,
    visibilityType,
    setPreviewMessage,
    setSelecetdMessage,
    selecetdMessage,
    fetchMessagesNew,
    setBackStep,
    searchKeyword,
    attachment,
    setAttachment,
    getTemplateVariants,
    getMessageVariants
  } = useMessageSteps();
  const [variants, setVariants] = useState([]);
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [caretPosition, setCaretPosition] = useState(0);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpload,setIsUpload]=useState(false)
  // const [attachment,setAttachment]=useState(null)
  const pickerRef = useRef(null);
  const timeoutRef = useRef(null);
  const { t } = useTranslation();
  const location =useLocation()

  const handleVisibilityChange = (val) => {
    console.log(val);
    if (variants.length > 0) {
      let updatedVariants = variants.map(item => ({ ...item })); // Always clone variants initially
  
      if (!val.inputs && !val.attachment) {
        message.error(`${val.label} does not support Name & Attachment, it will be removed if you have selected any.`);
        updatedVariants = updatedVariants.map(item => {
          const updatedText = item.name.replace(/\[first name\]/gi, "").replace(/\[last name\]/gi, "");
          return {
            ...item,
            name: updatedText,
            count: updatedText.length
          };
        });
        setAttachment(null);
      } else if (val.inputs && !val.attachment) {
        message.error(`${val.label} does not support Attachment, it will be removed if you have selected any.`);
        setAttachment(null);
      } else if (!val.inputs && val.attachment) {
        message.error(`${val.label} does not support Name, it will be removed if you have selected any.`);
        updatedVariants = updatedVariants.map(item => {
          const updatedText = item.name.replace(/\[first name\]/gi, "").replace(/\[last name\]/gi, "");
          return {
            ...item,
            name: updatedText,
            count: updatedText.length
          };
        });
      }
  
      setVariants(updatedVariants);
      if (selectedVariant?.id != null) {
        const newSelected = updatedVariants.find(v => v.id === selectedVariant.id);
        setSelectedVariant(newSelected || updatedVariants[0]); // update textarea binding
      }
    }
  
    setVisibility(val);
  };
  

  const handleCaretPosition = (e) => {
    setCaretPosition(e.target.selectionStart);
  };

  useEffect(() => {
    if (visibilityType) {
    setVisibility(visibilityOptions.find((v) => (v.id === visibilityType)));
    }else{
    setVisibility(selecetdMessage?.visibility);
    }

    if(selecetdMessage){
      if(!selecetdMessage.variants){
        if(selecetdMessage.msgType && selecetdMessage.msgType === "predefinedTemplate"){
          getTemplateVariants(selecetdMessage);
        }else{
          getMessageVariants(selecetdMessage);
        }
      }
    }else{
      setVariants(getDefaultVariants());
    }

    setName(selecetdMessage?.title || "");
  }, []);

  // once getTemplateVariants gets the variants data then update variants in the state
  useEffect(() => {
    if(selecetdMessage?.variants){
      setVariants(selecetdMessage.variants);
    }
  }, [selecetdMessage])

  const addVariants = () => {
    if (variants.length >= 10) {
      message.error("You can add only 10 variants!");
      return;
    }
    setVariants([...variants, { name: "", count: 0, id: variants?.[variants.length-1].id +1 }]);
  };

  const handleVariantText = (variable, index, isVar) => {
    const updatedVariants = [...variants];
    if (isVar) {
      const pointer = caretPosition || updatedVariants[index].name.length;
      let text_1 = updatedVariants[index].name.slice(0, pointer);
      let text_2 = updatedVariants[index].name.slice(pointer);
      updatedVariants[index].name = `${text_1}${variable}${text_2}`;
      updatedVariants[index].count = updatedVariants[index].name.length;
      setSelectedVariant({
        ...selectedVariant,
        name: updatedVariants[index].name,
        count: updatedVariants[index].name.length,
      });
    } else {
      const updatedVariants = [...variants];
      updatedVariants[index].name = variable;
      updatedVariants[index].count = updatedVariants[index].name.length;
      setSelectedVariant({
        ...selectedVariant,
        name: updatedVariants[index].name,
        count: updatedVariants[index].name.length,
      });
    }
    console.log("here 2")
    setVariants(updatedVariants);
  };

  useEffect(() => {

    console.log("variants")
    console.log(variants)

    if (!selectedVariant?.name) {
      setSelectedVariant(variants?.[0] || {});
    }
  }, [variants]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  const handlePreview = () => {
    const message = {
      variants: variants,
      title: name,
      visibility: visibility,
      attachment: attachment
    };
    setPreviewMessage(message);
    setSelecetdMessage(message);
    setStep(5);
    setBackStep(4)
  };
  const handleSelectedVariant = (data) => {
    setSelectedVariant(data);
    setCaretPosition(0)
    setIsDelete(false)
    clearTimeout(timeoutRef.current)
  };

  const handleDelete = () =>{
   if (isDelete) {
    const newVariant=variants.filter((vart)=>vart.id !== selectedVariant?.id)
    setVariants(newVariant)
    setIsDelete(false)
   }else{
    setIsDelete(true)
    timeoutRef.current = setTimeout(() => {
      setIsDelete(false)
    }, 3000);
   }
  }

  const handleSubmit = async()=>{
    if (!name.trim()) {
      message.error("Message Title is Required")
      return
    }
  
    if (!visibility?.id) {
      message.error("Visibility is Required")
      return
    }
    
    // .some() checks if at least one item matches the condition.
    if (variants.some(v => v.name.trim() === "")) {
      message.error("Some variants have an empty message.");
      return
    }
     
    let uploadData =  attachment
    if (!visibility?.attachment) {
      uploadData = null
    }
    const data = {
      name:name,
      variants:variants.map(variant => variant.name),
      visibility_type:[visibility.id],
      attachment:uploadData
    }
    if (data.variants.length < 3) {
           message.error("Atleast 3 Variants are Required")
           return
    }
    setIsLoading(true)

      try {
        const res = await apiCall({
              method: 'POST',
              url: '/all/messages/api/create-messages',
              data})
      if (res?.status === 200) {
        message.success("Message Successfully Created")
        if (location.pathname === "/library/messages") {
          fetchMessagesNew(null, searchKeyword, null)
        }else{
          fetchMessagesNew({limit:200,page:1})
        }
        setIsMessage(false)
      }else{
        message.error("Message Successfully Created")
      }
    setIsLoading(false)
      } catch (error) {
        message.error("Message Successfully Created")
        setIsLoading(false)
      }
  }

  useEffect(() => {
    console.log("attachment", attachment)
  }, [attachment])

  const getGroupedVisibilityOptions = (options) => {
    const grouped = {};
    options.forEach((option) => {
      if (!grouped[option.platform]) {
        grouped[option.platform] = [];
      }
      grouped[option.platform].push(option);
    });
    return Object.entries(grouped);
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen creatMessage z-[9999]">
      <div ref={containerRef} className="bg-white px-5 py-4 rounded-[10px] max-w-[1135px] mx-auto w-full relative max-h-[90vh] overflow-auto">
        <div className="flex items-center gap-[10px] text-[20px] font-[500]">
            {t("message.Message name")} 
          <CreateMessageIcon index={0} />
        </div>
        <div className="flex items-center justify-between gap-4 mt-2">
          <div
            className="flex justify-between items-center flex-grow border border-[#00040733] 
                rounded px-4 py-0.5 pl-4 pr-[2px]"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              className="font-normal text-[16px] leading-[24px] outline-none flex-grow"
              value={name}
            />
            <span className="text-[#8C8C8C] bg-[#F5F5F5] px-[30px] py-[7px]">
              {name?.length}/50
            </span>
          </div>
          <div className="pros-dropdownWrap relative">
            <div className="pros-dropdown-text flex items-center justify-around gap-2 border border-[#CCCDCD] min-h-[44px] rounded-[6px] px-[10px] py-[5px] min-w-[193px] font-medium text-[14px] leading-[21px] text-black">
              <img src={visibility?.icon} />
              <span className="flex-1 text-[14px]">{visibility?.label}</span>
              <CreateMessageIcon index={1} />
            </div>
            <div className="pros-dropdownCont absolute top-full left-0 w-full opacity-0 invisible bg-white pb-3 rounded-[10px]">
              {getGroupedVisibilityOptions(visibilityOptions).map(([platform, options]) => (
                <div key={platform} className="mt-3 ">
                  {/* Platform Heading - no background, just light text + border */}
                  <div className="text-gray-500 text-sm font-semibold capitalize border-b border-gray-200 pb-1 mb-2 px-4">
                {platform}
              </div>

                  {/* List the options with indent */}
                  <div className="px-2">
                    {options.map((visibility) => (
                      <div
                        key={visibility.id}
                        onClick={() => handleVisibilityChange(visibility)}
                        className="pros-dropdownItems min-h-[40px] flex items-center gap-2 px-[10px] py-2 rounded-md cursor-pointer hover:bg-[#0087FF] hover:text-white"
                      >
                        <img className="normalIcon" src={visibility.icon} />
                        <img className="normalIconHover" src={visibility.iconLight} />
                        <span className="flex-1 text-[14px]">
                          {t(`message.${visibility.label}`)}
                        </span>
                        <CreateMessageIcon index={2} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              { /* visibilityOptions?.map((visibility) => {
                return (
                  <div
                  key={visibility.id}
                    onClick={() => handleVisibilityChange(visibility)}
                    className="pros-dropdownItems min-h-[40px] flex items-center gap-2 px-[10px] py-2 rounded-md cursor-pointer hover:bg-[#0087FF] hover:text-white"
                  >
                    <img className="normalIcon" src={visibility.icon} />
                    <img
                      className="normalIconHover"
                      src={visibility.iconLight}
                    />
                    <span className="flex-1 text-[14px]">
                      {t(`message.${visibility.label}`)}  
                    </span>
                    <CreateMessageIcon index={2} />
                  </div>
                );
              }) */ }
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-[200px] bg-[#F5F5F5] rounded p-3">
            <div className="flex items-center gap-[10px] text-[20px] font-[500]">
               {t("message.Your variants")}
              <CreateMessageIcon index={3} />
            </div>
            <div className="mt-4">
              {variants?.map((data, i) => {
                return (
                  <button
                  key={data.id}
                    onClick={() => handleSelectedVariant(data)}
                    className={`varient-btn-hover  border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px]  ${
                      data?.id === selectedVariant?.id
                        ? "bg-[#0087FF] text-white varient-btn-hover-selected "
                        : "bg-white"
                    } hover:bg-[#0087FF] hover:text-white`}
                  >
                    <CreateMessageIcon index={4} />
                    Varient - {i + 1}
                  </button>
                );
              })}
              <button
                onClick={() => addVariants()}
                className="varient-btn-hover bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white"
              >
                + {t("message.Add Variant")}
              </button> 
            </div>
          </div>
          <div className="w-[685px] px-3 py-1">
            <div className="flex items-center justify-between gap-[10px] mb-1">
              <div className="flex items-center gap-[10px] text-[20px] font-[500]">
                 {t("message.Write message")}
                <CreateMessageIcon index={5} />
              </div>
              {/* <button
                onClick={() => handlePreview()}
                className="varient-btn-hover bg-white border border-[#0087FF] text-[14px] text-[#0087FF] px-4 py-2 rounded-md hover:bg-[#0087FF] hover:text-white min-h-[36px]"
              >
                  {t("message.Preview")}
              </button> */}
              {variants.length > 3 ? <button
                onClick={() => handleDelete()}
                className="flex space-x-1 items-center bg-[#FF00001C] text-[#FF0000] px-3 py-1 rounded-full text-sm"
              >
                  {isDelete?"Really ?":<>
                    <span className="">
                    <DeleteFillRedIcon />
                  </span>
                  <span>
                    Delete
                  </span>
                  </>}
              </button>:""}
            </div>
            <div className="border border-[#E6E6E6] h-[93.75%] p-3">
              <textarea
                onChange={(e) =>
                  handleVariantText(e.target.value, selectedVariant.id, false)
                }
                onClick={handleCaretPosition}
                onKeyUp={handleCaretPosition}
                value={selectedVariant?.name}
                className="w-full font-outfit font-normal text-[14px] leading-[17.64px]
                      tracking-[0px] text-left h-[90%] text-black focus:outline-none"
              />

              <div className="flex items-center gap-[10px] justify-between">
                <div className="flex items-center gap-[10px]">
                {
                 visibility?.inputs && <>
                 <button
                    onClick={() =>
                      handleVariantText(
                        "[first name]",
                        selectedVariant.id,
                        true
                      )
                    }
                    className="varient-btn-hover bg-white border border-[#0087FF] text-[14px] text-[#0087FF] px-4 py-2 rounded-md hover:bg-[#0087FF] hover:text-white min-h-[36px]"
                  >
                     {t("message.First name")}
                  </button>
                  <button
                    onClick={() =>
                      handleVariantText("[last name]", selectedVariant.id, true)
                    }
                    className="varient-btn-hover bg-white border border-[#0087FF] text-[14px] text-[#0087FF] px-4 py-2 rounded-md hover:bg-[#0087FF] hover:text-white min-h-[36px]"
                  >
                  {t("message.Last name")}
                    
                  </button>
                 </>
                }
                  <button
                    onClick={() => setIsEmojiPickerOpen(true)}
                    className="varient-btn-hover flex items-center gap-2 bg-white border border-[#0087FF] text-[14px] text-[#0087FF] px-4 py-1 rounded-md hover:bg-[#0087FF] hover:text-white min-h-[36px]"
                  >
                    <CreateMessageIcon index={7} />
                    
                    {t("message.Emoji")}
                  </button>
                  {isEmojiPickerOpen && (
                    <div
                      ref={pickerRef}
                      style={{ width: "100%" }}
                      className="picker-Wrapper absolute left-[52%] top-[34%]"
                    >
                      <EmojiPicker
                        onEmojiClick={({ emoji }) => {
                          handleVariantText(emoji, selectedVariant.id, true);
                        }}
                        skinTonesDisabled={true}
                        emojiVersion="4.0"
                      />
                    </div>
                  )}
                 {visibility?.attachment&&
                  <button onClick={()=>setIsUpload(true)} className="varient-btn-hover flex items-center gap-2 bg-white border border-[#0087FF] text-[14px] text-[#0087FF] px-4 py-2 rounded-md hover:bg-[#0087FF] hover:text-white min-h-[36px]">
                    <CreateMessageIcon index={6} />
                    {attachment ? "Change image" : t("message.Upload image")}
                  </button>
                 }
                </div>
                <span className="font-medium text-[14px] leading-[21px] tracking-[0%] text-[#00000080] px-4">
                  {selectedVariant?.count || 0}/2000
                </span>
              </div>
            </div>
          </div>
          <div className="w-[200px] bg-[#F5F5F5] rounded p-3 ">
            <div className="flex items-center gap-[10px] text-[20px] mb-3 font-[500]">
              {t("message.Write with AI")}
              <CreateMessageIcon index={0} />
            </div>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <CreateMessageIcon index={9} />
              {t("message.Write with AI")}
            </button>
            <p className="font-normal text-[14px] leading-[21px] uppercase my-[10px]">
               {t("message.Rewrite")}
            </p>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <img src={pencilIcon} />
               {t("message.Improve it")}
            </button>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <img src={scissorsIcon} />
               {t("message.Shorten")}
            </button>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <img src={paintbrushIcon} />
               {t("message.Simplify")}
            </button>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <img src={framedPictureIcon} />
               {t("message.Detailed")}
            </button>
            <p className="font-normal text-[14px] leading-[21px] uppercase my-[10px]">
               {t("message.Adjust Tone")}
            </p>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <img src={backHandIcon} />
               {t("message.Anticipatory")}
            </button>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <img src={rasingHandIcon} />
               {t("message.Assertive")}
            </button>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <img src={smilingFace} />
               {t("message.Compassionate")}
            </button>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <img src={smilingFaceGlasses} />
               {t("message.Confident")}
            </button>
            <p className="font-normal text-[14px] leading-[21px] uppercase my-[10px]">
            {t("message.Revert changes")}
            </p>
            <button className="varient-btn-hover text-[14px] bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
              <CreateMessageIcon index={10} />
               {t("message.Revert changes")}
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-between mt-6">
          <button
            onClick={() => handlePreview()}
            className="cursor-pointer flex justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-full max-w-[200px] rounded-md"
          >
             {t("message.Preview")}
          </button>
          <div className="flex gap-4">
            <button
              className="cursor-pointer font-regular text-[21px] leading-[36px] bg-[#E8E8E8] 
                 px-4 py-1.5 w-[200px] rounded-md flex justify-center"
              onClick={() => setIsMessage(false)}
            >
               {t("message.Cancel")}
            </button>
            <button onClick={()=>handleSubmit()} className="cursor-pointer flex white-spin  items-center justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-[200px] rounded-md">
              

              {
                isLoading ? <Spin size="small" style={{color:"white"}}/>  :<>  {t("message.Create")}
                <CreateMessageIcon index={11} /> </>
              }
            </button>
          </div>
        </div>
        { isUpload && <Upload setIsUpload={setIsUpload}  setAttachment={setAttachment}  attachment={attachment}/>}

      </div>
    </div>
  );
};
const visibilityOptions = [
  {
    id: "fb_prospecting",
    label: "Prospecting",
    icon: propSearch,
    iconLight: prospWhite,
    inputs: true,
    attachment: false,
    platform: "facebook"
  },
  {
    id: "fb_crm",
    label: "CRM",
    icon: messangerIcon,
    iconLight: messangerWhite,
    inputs: true,
    attachment: true,
    platform: "facebook"
  },
  { id: "birthday", 
    label: "Birthday", 
    icon: BdayIcon, 
    iconLight: BdayWhite,
    inputs: true,
    attachment: true,
    platform: "facebook"
  },
  {
    id: "request",
    label: "Request",
    icon: requestIcon,
    iconLight: requestWhite,
    inputs: true,
    attachment: true,
    platform: "facebook"
  },
  {
    id: "ig_prospecting",
    label: "Prospecting",
    icon: IgProsp,
    iconLight: prospWhite,
    inputs: false,
    attachment: false,
    platform: "instagram"
  },
  { id: "ig_crm",
    label: "CRM", 
    icon: IgCrm, 
    iconLight: IgCrmWhite ,  
    inputs: false,
    attachment: true,
    platform: "instagram"
  },
];

const defaultVariants = [
  { id: 0, name: "", count: 0 },
  { id: 1, name: "", count: 0 },
  { id: 2, name: "", count: 0 },
];

const getDefaultVariants = () => defaultVariants.map((variant) => ({ ...variant }));


export default CreateMessage;
