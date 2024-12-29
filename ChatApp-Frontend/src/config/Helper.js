// Function to format time as 'time ago'
export function formatTimeWithAMPM(timestamp) {
  const time = new Date(timestamp);

  // Format the given timestamp to AM/PM
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = time.toLocaleTimeString([], options);

  return formattedTime;
}
