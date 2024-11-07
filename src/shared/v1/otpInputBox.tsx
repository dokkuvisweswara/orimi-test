import React, { useState, useEffect } from "react";

export default function OtpInputBox({ length, otpcallback, autoFocus, uniquekey }: any) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (autoFocus) {
      // Focus on the first input field on mount
      document.getElementById(`${uniquekey}_0`)?.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const value = e.key;
    if (value !== "Backspace" && isNaN(parseInt(value, 10))) {
      return;
    }

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];

      if (value !== "Backspace" && value !== "" && index < length - 1) {
        // Move focus to the next input field
        document.getElementById(`${uniquekey}_${index + 1}`)?.focus();
      }

      if (value !== "Backspace") {
        newOtp[index] = value;
      }

      if (value === "Backspace" && index < length && index !== 0) {
        if ((index + 1 === length) && newOtp[index]) {
          document.getElementById(`${uniquekey}_${index}`)?.focus();
          setFocusedIndex(index);
          newOtp[index] = "";
        } else {
          document.getElementById(`${uniquekey}_${index - 1}`)?.focus();
          setFocusedIndex(index - 1);
          newOtp[index - 1] = "";
        }
      }
      return newOtp;
    });
  };

  useEffect(() => {
    const originalOtp = parseInt(otp.join(''), 10);
    otpcallback(originalOtp.toString());

  }, [otp]);

  return (
    <div className="flex">
      {otp && otp.map((digit, index) => (
        <input
          // key={index}
          // id={`otp_${index}`}
          key={`${uniquekey}_${index}`} // Unique key name
          id={`${uniquekey}_${index}`}
          type="password"
          maxLength={1}
          value={digit}
          onKeyDown={(e) => handleInputChange(e, index)}
          className={`w-[50%] h-12 border border-gray-500 rounded mx-0.5 text-center bg-transparent text-primaryColor`}
        />
      ))}
    </div>
  );
}