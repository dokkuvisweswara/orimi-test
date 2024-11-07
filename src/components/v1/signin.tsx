"use client";
import LookUpPage from "@/components/v1/lookup";
import LongInPage from "@/components/v1/login";
import SignUpPage from "@/components/v1/signup";
import { useEffect, useState } from "react";
export default function Home() {
  const [showComponnent, setShowComponnent] = useState("");

  const [payloadData, setPayloadData] = useState(false);

  const callbackHome = (data: any) => {
    setPayloadData(data);
    setShowComponnent(data.componentKey);
  };

  return (
    <>
      {!showComponnent ? (
        <LookUpPage callbackHome={callbackHome} />
      ) : showComponnent === "signup" ? (
        <SignUpPage payloadData={payloadData} />
      ) : (
        <LongInPage payloadData={payloadData} />
      )}
    </>
  );
}
