//./utils/getToday.js
// Returns current day as string like "Monday"
exports.getTodayDay = () =>
  new Date().toLocaleDateString('en-US', { weekday: 'long' });

// Returns current date in format: DD-MM-YYYY (e.g., "03-07-2025")
exports.getTodayDate = () =>
  new Date().toLocaleDateString('en-GB').split('/').join('-');
