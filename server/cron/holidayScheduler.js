const cron = require('node-cron');
const HebHolidays = require('../models/isrHolidaysSchema');
const { HebrewCalendar } = require('@hebcal/core');

const runHolidayCheck = async () => {
  const year = new Date().getFullYear() + 1;

  const existing = await HebHolidays.findOne({ date: { $regex: `^${year}-` } });
  if (existing) {
    console.log(`Holidays for ${year} already exist in the database`);
    return;
  }

  console.log(`Generating ${year} holidays using @hebcal/core...`);

  try {
    const hdates = new HebrewCalendar({
      year,
      isHebrewYear: true,
      major: true,
      minor: true,
      modern: true,
      israel: true,
    });

    const events = hdates.getHolidays();
    const holidays = events.filter(e => e.getFlags() & e.flags.HOLIDAY);

    for (const event of holidays) {
      const holidayDoc = {
        date: event.greg().toISOString().slice(0, 10),
        hdate: event.getDate()?.toStringHebrew(),
        title: event.render('en'),
        hebrew: event.render('he'),
        category: "holiday",
        subcat: null,
        leyning: null,
        link: null,
        memo: null,
      };

      await HebHolidays.updateOne(
        { date: holidayDoc.date },
        { $set: holidayDoc },
        { upsert: true }
      );
    }

    console.log(`${holidays.length} holidays have been saved for ${year}`);
  } catch (err) {
    console.error("Error generating holidays:", err.message);
  }
};

cron.schedule('0 0 1 1 *', runHolidayCheck);

module.exports = runHolidayCheck;
