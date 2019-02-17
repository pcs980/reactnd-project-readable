import moment from 'moment';

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString('en-US');
  return date.toLocaleDateString() + ' | ' + time.substr(0, 5) + time.slice(-2);
};

export const justDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const friendlyDate = (timestamp) => {
  const today = moment.utc();
  const date = moment.utc(timestamp);

  const days = date.diff(today, 'days');
  return moment.duration(days, 'days').humanize(true);
}