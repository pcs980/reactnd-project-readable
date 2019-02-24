import {toast} from 'react-toastify';

export const showEvent = (type, message) => {
  type = type ? type.toLowerCase() : 'info';

  return toast(message, {
    type
  });
};
