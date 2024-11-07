'use client'
import React from 'react';
import { ToastContainer, toast, ToastOptions, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "animate.css/animate.min.css";


const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
  });
  
const Toaster = ({}) => {
  return (
      <ToastContainer  transition={bounce} />
  );
};

const notify = (message: string, type: 'success' | 'error' | 'info' | 'warn', position?: ToastOptions['position'], autoClose?: number) => {
    const defaultPosition: ToastOptions['position'] = 'top-right';
    const defaultAutoClose: number = 1000;

    const options: ToastOptions = {
        position: position || defaultPosition,
        autoClose: autoClose || defaultAutoClose,

        // You can add more options based on the type if needed
    };
    // Choose the appropriate toast function based on the type
    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        case 'info':
            toast.info(message, options);
            break;
        case 'warn':
            toast.warn(message, options);
            break;
        // Add more cases if needed
        default:
            toast(message, options);
    }
};

export { Toaster, notify };