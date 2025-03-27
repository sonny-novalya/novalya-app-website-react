import { t } from "i18next";

const Filters = () => {
  return (
    <main className="">
      <h2 className="font-medium text-lg">{t("prospecting.Filters")}</h2>
      <div className="flex justify-between border border-[#00000014] rounded-md p-4">
        <div className="flex flex-col flex-1 pr-4 space-y-2">
          <h3 className="font-medium">{t("prospecting.Gender")}</h3>
          <p className="w-full text-center border border-[#00000014] rounded-md p-2">
            ♂ Male
          </p>
        </div>
        <div className="border-l-2 border-[#00000014] px-5 space-y-2 flex-1">
          <h3 className="font-medium">Keyword</h3>
          <p className="w-full text-center border border-[#00000014] rounded-md p-2">
            Chef d’entreprise
          </p>
        </div>
      </div>
    </main>
  );
};

export default Filters;
