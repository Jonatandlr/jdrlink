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

    if(data.message === "Hash not found"){
        router.push("/");
    }else{
    //    console.log(data.url)
       router.push(data.url);
    }
    // console.log(data);
  };

  link();

  return <div>Hola</div>;
}
