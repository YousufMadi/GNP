import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const notifyDef = (msg) => toast(msg); //White toast
export const notifyWarn = (msg) => toast.warn(msg); //Yellow toast
export const notifySuccess = (msg) => toast.success(msg); //Green toast
export const notifyError = (msg) => toast.error(msg); //Red toast
export const notifyInfo = (msg) => toast.info(msg); // Blue toast
export const notifyDark = (msg) => toast.dark(msg); // Black toast
