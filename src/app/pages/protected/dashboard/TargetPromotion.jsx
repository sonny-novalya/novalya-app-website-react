import { t } from "i18next";

const TargetedPromotion = () => {
    const actions = [
        { action: t("dashboard.Import Facebook groups"), completed: false, videoUrl: "https://www.youtube.com/watch?v=abc123" },
        { action: t("dashboard.Add one person to CRM"), completed: false, videoUrl: "https://www.youtube.com/watch?v=xyz789" },
        { action: t("dashboard.Add one person to CRM"), completed: false, videoUrl: "https://www.youtube.com/watch?v=def456" },
    ]

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mt-5">
            <h4 className="font-semibold  mb-3">{t("dashboard.Next Actions")}</h4>
            {actions.map((action, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
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
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white" />
                        <span className="text-sm">{action.action}</span>
                    </div>
                    <a href={action.videoUrl} target="_blank" rel="noopener noreferrer">
                        <button className="text-sm text-white bg-[#21BF7C] w-80 px-4 py-2 rounded hover:bg-green-600">
                            {t("dashboard.Watch Video")}
                        </button>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default TargetedPromotion;
