const HebHolidays = require("../models/isrHolidaysSchema");
const { HebrewCalendar } = require('@hebcal/core');

const fetchAndSaveHolidays = async (req, res) => {
  const year = req.params.year || new Date().getFullYear();

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
        category: 'holiday',
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

    res
      .status(200)
      .json({ message: `${holidays.length} holidays saved for ${year}` });
  } catch (err) {
    console.error("Failed to fetch holidays:", err.message);
    res.status(500).json({ error: "Failed to generate or save holidays" });
  }
};

const getSavedHolidays = async (req, res) => {
  const { format } = req.query;

  if (!format) {
    const lang = req.headers['accept-language'];
    if (lang.includes('he')) {
      format = 'he';
    } else if (lang.includes('en')) {
      format = 'en';
    } else {
      format = 'both';
    }
  }
  try {
  const holidays = await HebHolidays.find().sort({ date: 1 });

  if (format === ' he') {
    holidays = holidays.map(h => ({
      date: h.hdate,
      title: h.hebrew,
    }));
  } else if (format === 'en') {
    holidays = holidays.map(h => ({
      date: h.date,
      title: h.title,
    }));
  } else {
    holidays = holidays.map(h => ({
      date: h.date,
      hdate: h.hdate,
      title: h.title,
      hebrew: h.hebrew,
    }))
  }
  res.status(200).json(holidays);
  } catch (err) {
    console.error("Error getting holidays:", err.message);
    res.status(500).json({ error: "Faild to get saved holidays" });
  }
}

module.exports = { fetchAndSaveHolidays, getSavedHolidays };
