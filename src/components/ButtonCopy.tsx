"use client"
import React, { useState } from "react";
import clsx from "clsx";



export default function ButtonCopy({ link,className }: { link: string,className?:string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };
  return (
    <>
      <button
        onClick={handleCopy}
        className={clsx("ml-2 p-1 text-black hover:text-red-600 focus:outline-none",className)}
        
        aria-label="Copy to clipboard"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-copy"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
      {copied && (
        <span className="absolute right-7 top-0 mt-2 mr-2 text-green-600">
          Copied!
        </span>
      )}
    </>
  );
}
