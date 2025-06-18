export function getCurrentWeekDates() {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  
  const dayOfdWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfdWeek);

  const week = [];

  const hebrewDays = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];
  const keys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);

    const day = currentDate.getDate();
    const mounth = currentDate.getMonth() +1;
    const fullDate = currentDate.toISOString().slice(0, 10);

    week.push({
       key: keys[i],
       label: hebrewDays[i],
       date: `${day}/${mounth}`,
       fullDate,
       isToday: fullDate === todayStr,
    });
  }

  return week;
}