"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const router = useRouter();

  const link = async () => {
    const response = await fetch(
      `http://localhost:3000/api/link?type=getLink&hash=${segments[0]}`,
      { method: "GET" }
    );
    const data = await response.json();

    if (data.message === "Hash not found") {
      router.push("/");
    } 
    // else {
    //   //    console.log(data.url)
    //   router.push(data.url);
    // }
    // console.log(data);
  };

  link();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-foreground">
      <div className="space-y-4 text-center">
         <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600" />
        </div>
        <p className="text-lg font-medium text-rose-600">
          Redirecting to shorter link...
        </p>
      </div>
    </div>
  );
}
