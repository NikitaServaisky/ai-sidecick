export const getToDay = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export const getWeekDays = () => {
    const today = new Date();
    const week = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        week.push({
            date: day,
            formatted: formatDate(day),
        });
    }

    return week;
};

export const getmontDays = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(year, month, i);
        days.push({
            date,
            day: i,
            formateed: date.toLocaleDateString('en-BG', {
                weekday: 'short',
                day: 'numeric',
                month: "short",
            }),
        });
    }
    return days;
}