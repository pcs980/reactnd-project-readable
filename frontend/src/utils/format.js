export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString('en-US');
  return friendlyDate(date) + ' | ' + time.substr(0, 5) + time.slice(-2);
};

const friendlyDate = (date) => {
  const today = new Date();

  if (today.getMonth() === date.getMonth()
    && today.getDate() === date.getDate()
    && today.getYear() === date.getYear()) {
      return 'Today';
    } else {
      return date.toLocaleDateString();
    }
};
