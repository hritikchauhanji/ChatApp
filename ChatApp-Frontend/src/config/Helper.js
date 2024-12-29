// Function to format time as 'time ago'
export function formatTimeWithAMPM(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);

  const hoursDiff = Math.abs(now.getHours() - time.getHours());
  const minutesDiff = Math.abs(now.getMinutes() - time.getMinutes());

  // Format the given timestamp to AM/PM
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = time.toLocaleTimeString([], options);

  if (hoursDiff === 0 && minutesDiff === 0) {
    return `Just now (${formattedTime})`;
  }

  return `${formattedTime}`;
}
