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

const CreateMessage = () => {
  const {
    setStep,
    setIsMessage,
    visibilityType,
    setPreviewMessage,
    setSelecetdMessage,
    selecetdMessage,
  } = useMessageSteps();
  const [variants, setVariants] = useState([]);
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [caretPosition, setCaretPosition] = useState(0);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const pickerRef = useRef(null);
  const { t } = useTranslation();

  const handleVisibilityChange = (val) => {
    setVisibility(val);
  };

  const handleCaretPosition = (e) => {
    setCaretPosition(e.target.selectionStart);
  };

  useEffect(() => {
    setVisibility(visibilityOptions.find((v) => v.id === visibilityType));
    setVariants(
      selecetdMessage ? [...selecetdMessage?.variants] : [...defaultVariants]
    );
    setName(selecetdMessage?.name || "");
  }, []);

  const addVariants = () => {
    if (variants.length >= 10) {
      message.error("You can add only 10 variants!");
      return;
    }
    setVariants([...variants, { text: "", count: 0, id: variants.length }]);
  };

  const handleVariantText = (variable, index, isVar) => {
    const updatedVariants = [...variants];

    if (isVar) {
      const pointer = caretPosition || updatedVariants[index].text.length;
      let text_1 = updatedVariants[index].text.slice(0, pointer);
      let text_2 = updatedVariants[index].text.slice(pointer);
      updatedVariants[index].text = `${text_1}${variable}${text_2}`;
      updatedVariants[index].count = updatedVariants[index].text.length;
      setSelectedVariant({
        ...selectedVariant,
        text: updatedVariants[index].text,
        count: updatedVariants[index].text.length,
      });
    } else {
      const updatedVariants = [...variants];
      updatedVariants[index].text = variable;
      updatedVariants[index].count = updatedVariants[index].text.length;
      setSelectedVariant({
        ...selectedVariant,
        text: updatedVariants[index].text,
        count: updatedVariants[index].text.length,
      });
    }

    setVariants(updatedVariants);
  };

  useEffect(() => {
    if (!selectedVariant?.text) {
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

  const hnadlePreview = () => {
    const message = {
      variants: variants,
      name: name,
      visibility: visibility,
    };
    setPreviewMessage(message);
    setSelecetdMessage(message);
    setStep(5);
  };
  const handleSelectedVariant = (data) => {
    setSelectedVariant(data);
    setCaretPosition(0);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen creatMessage">
      <div className="bg-white px-5 py-4 rounded-[10px] max-w-[1135px] mx-auto w-full relative max-h-[90vh] overflow-auto">
        <div className="flex items-center gap-[10px] text-[20px]">
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
            <div className="pros-dropdownCont absolute top-full left-0 w-full opacity-0 invisible bg-white py-3 rounded-[10px]">
              {visibilityOptions?.map((visibility) => {
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
              })}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-[200px] bg-[#F5F5F5] rounded p-3">
            <div className="flex items-center gap-[10px] text-[20px]">
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
              <div className="flex items-center gap-[10px] text-[20px]">
                 {t("message.Write message")}
                <CreateMessageIcon index={5} />
              </div>
              <button
                onClick={() => hnadlePreview()}
                className="varient-btn-hover bg-white border border-[#0087FF] text-[14px] text-[#0087FF] px-4 py-2 rounded-md hover:bg-[#0087FF] hover:text-white min-h-[36px]"
              >
                  {t("message.Preview")}
              </button>
            </div>
            <div className="border border-[#E6E6E6] h-[93.75%] p-3">
              <textarea
                onChange={(e) =>
                  handleVariantText(e.target.value, selectedVariant.id, false)
                }
                onClick={handleCaretPosition}
                onKeyUp={handleCaretPosition}
                value={selectedVariant?.text}
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
                  <button className="varient-btn-hover flex items-center gap-2 bg-white border border-[#0087FF] text-[14px] text-[#0087FF] px-4 py-2 rounded-md hover:bg-[#0087FF] hover:text-white min-h-[36px]">
                    <CreateMessageIcon index={6} />
                    {t("message.Upload image")}
                   
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
            <div className="flex items-center gap-[10px] text-[20px] mb-3">
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
            onClick={() => hnadlePreview()}
            className="flex justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-full max-w-[200px] rounded-md"
          >
             {t("message.Preview")}
          </button>
          <div className="flex gap-4">
            <button
              className="font-regular text-[21px] leading-[36px] bg-[#E8E8E8] 
                 px-4 py-1.5 w-[200px] rounded-md flex justify-center"
              onClick={() => setIsMessage(false)}
            >
               {t("message.Cancel")}
            </button>
            <button className="flex items-center justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-[200px] rounded-md">
               {t("message.Create")}
              <CreateMessageIcon index={11} />
            </button>
          </div>
        </div>
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
    attachment: false
  },
  {
    id: "fb_crm",
    label: "CRM",
    icon: messangerIcon,
    iconLight: messangerWhite,
    inputs: true,
    attachment: true
  },
  { id: "birthday", 
    label: "Birthday", 
    icon: BdayIcon, 
    iconLight: BdayWhite,
    inputs: true,
    attachment: true
  },
  {
    id: "request",
    label: "Request",
    icon: requestIcon,
    iconLight: requestWhite,
    inputs: true,
    attachment: true
  },
  {
    id: "ig_prospecting",
    label: "Prospecting",
    icon: IgProsp,
    iconLight: IgCrmWhite,
    inputs: false,
    attachment: false
  },
  { id: "ig_crm",
    label: "CRM", 
    icon: IgCrm, 
    iconLight: IgCrmWhite ,  
    inputs: false,
    attachment: true 
  },
];

const defaultVariants = [
  { id: 0, text: "", count: 0 },
  { id: 1, text: "", count: 0 },
  { id: 2, text: "", count: 0 },
];

export default CreateMessage;
