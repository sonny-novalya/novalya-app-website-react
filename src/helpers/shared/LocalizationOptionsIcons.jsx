import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

import engFlag from "../../assets/img/flags/usa.png";
import spanishFlag from "../../assets/img/flags/spanish.png";
import frenchFlag from "../../assets/img/flags/french.png";
import portugalFlag from "../../assets/img/flags/portugal.png";
import germanyFlag from "../../assets/img/flags/germany.png";
import { useLocaleStore } from "../../store/localization/Localization";

const { Option } = Select;

const LocalizationOptionsIcons = () => {
    const { i18n, t } = useTranslation();
    // const { setCurrentLanguage } = useContext(CustomProvider);
    const { selectedLocale, setSelectedLocale } = useLocaleStore();

    const languages = [
        { label: t("language.English"), locale: "en-US", img: engFlag },
        { label: t("language.French"), locale: "fr-FR", img: frenchFlag },
        { label: t("language.German"), locale: "de-DE", img: germanyFlag },
        { label: t("language.Spanish"), locale: "es-ES", img: spanishFlag },
        { label: t("language.Portuguese"), locale: "pt-PT", img: portugalFlag },
    ];

    const activeLocale = languages.find((lang) => lang.locale === selectedLocale) || languages[0];

    useEffect(() => {
        i18n.changeLanguage(selectedLocale);
        // setCurrentLanguage(selectedLocale);
    }, [selectedLocale]);

    const handleChange = (value) => {
        const selectedLanguage = languages.find((lang) => lang.locale === value);
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage.locale).then(() => {
                setSelectedLocale(selectedLanguage.locale);
                // setCurrentLanguage(selectedLanguage.locale);
            });
        }
    };

    return (
        <div className="custom-language-cs">
            <Select
                value={activeLocale.locale}
                onChange={handleChange}
                suffixIcon={null} // Hides dropdown arrow
                className="w-full border rounded overflow-hidden language-popup"
                optionLabelProp="label"
                dropdownStyle={{ minWidth: 60 }}
            >
                {languages.map((language) => (
                    <Option
                        key={language.locale}
                        value={language.locale}
                        label={
                            <img
                                src={language.img}
                                alt={language.label}
                                className="w-full h-auto object-contain"
                            />
                        }
                    >
                        <div className="w-full">
                            <img
                                src={language.img}
                                alt={language.label}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </Option>
                ))}
            </Select>

        </div>
    );
};

export default LocalizationOptionsIcons;
