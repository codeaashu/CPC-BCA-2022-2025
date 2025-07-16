
export function formatDate(date) {
  if (!date) return "";
  
  const dateObj = new Date(date);
  
  // Array of month names
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Get date components
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate().toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  // Return formatted date string
  return `${month} ${day}, ${year}`;
}

// Additional date utility functions you might need
export function formatDateWithTime(date) {
  if (!date) return "";
  
  const dateObj = new Date(date);
  const formattedDate = formatDate(date);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  return `${formattedDate} ${hours}:${minutes}`;
}

export function getTimeAgo(date) {
  if (!date) return "";
  
  const now = new Date();
  const dateObj = new Date(date);
  const secondsAgo = Math.floor((now - dateObj) / 1000);
  
  if (secondsAgo < 60) {
    return 'Just now';
  }
  
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  }

   const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) {
    return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  }
  
  // If more than 7 days, return formatted date
  return formatDate(date);
}
