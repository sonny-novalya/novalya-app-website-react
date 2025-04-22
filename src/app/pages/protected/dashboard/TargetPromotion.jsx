import { t } from "i18next";

const TargetedPromotion = () => {
    const actions = [
        { action: t("dashboard.Import Facebook groups"), completed: false, videoUrl: "https://www.youtube.com/watch?v=abc123" },
        { action: t("dashboard.Add one person to CRM"), completed: false, videoUrl: "https://www.youtube.com/watch?v=xyz789" },
        { action: t("dashboard.Add one person to CRM"), completed: false, videoUrl: "https://www.youtube.com/watch?v=def456" },
    ]

    return (
        <div className="bg-white rounded-[10px] px-5 pt-4 pb-10 mt-6">
            <h4 className="font-[500] text-[24px] mb-4">{t("dashboard.Next Actions")}</h4>
            {actions.map((action, index) => (
                <div key={index} className="flex items-center justify-between border border-[#21BF7C33] px-2 py-1.5 pl-5 rounded mb-2.5">
                    <div className="flex items-center space-x-2">
                        {/* <input
                            type="checkbox"
                            className="rounded-full border-gray-300"
                            checked={action.completed}
                            onChange={() => {
                                setActions(prevActions =>
                                    prevActions.map((prevAction, i) =>
                                        i === index
                                            ? { ...prevAction, completed: !prevAction.completed }
                                            : prevAction
                                    )
                                );
                            }}
                        /> */}
                        <div className="w-5 h-5 rounded-full border-2 border-[#21BF7C33] bg-white" />
                        <span className="text-[20px] font-[500]">{action.action}</span>
                    </div>
                    <a href={action.videoUrl} target="_blank" rel="noopener noreferrer">
                        <button className="text-white bg-[#21BF7C] w-50 rounded hover:bg-green-600 text-[14px] rounded-[6px] px-[30px] py-[12px]">
                            {t("dashboard.Watch Video")}
                        </button>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default TargetedPromotion;
