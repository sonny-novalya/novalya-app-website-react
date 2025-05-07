// 01 May 2025        11:40 this format

export const dateFormat = (dateString) => {
    const date = new Date(dateString);

    // Manually format the date as "dd MMM yyyy hh:mm"
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,  // to get 24-hour format
    };

    const formattedDate = date.toLocaleString('en-GB', options)
        .replace(",", "")  // Remove the comma
        .replace(/(\d{2} \w{3} \d{4})/, '   $1')  // Ensure space between date and time
        .replace(/(\d{2}:\d{2})$/, ' $1'); // Make sure time is at the end with space
    return formattedDate;  // Output format: "01 May 2025 11:40"
};