
export const formatDateFun = (dateInput, isUnix = false) => {
    const date = isUnix ? new Date(dateInput * 1000) : new Date(dateInput);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    // const translatedMonth = t(`pages.title.${month}`);
    return `${month} ${day}, ${year}`;
};