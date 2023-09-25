
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export function toastInit(message,config) {
  return toast(message, {
    type: 'error',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    pauseOnFocusLoss: false,
    ...config,
 })
}