import moment from 'moment';

/**
 * Format Date
 * @param {number} timestamp - Date and time in Unix format
 * @returns {string} Readable date and hour
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString('en-US');
  return date.toLocaleDateString() + ' | ' + time.substr(0, 5) + time.slice(-2);
};

/**
 * Just Date
 * @param {humber} timestamp - Date and time in Unix format
 * @returns {string} Readable date
 */
export const justDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

/**
 * Friendly Date
 * @param {humber} timestamp - Date and time in Unix format
 * @returns {string} Humanized date and time
 */
export const friendlyDate = (timestamp) => {
  const today = moment.utc();
  const date = moment.utc(timestamp);

  const days = date.diff(today, 'days');
  return moment.duration(days, 'days').humanize(true);
};