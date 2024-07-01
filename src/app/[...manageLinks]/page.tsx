"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const router = useRouter();

  useEffect(() => {
    const link = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/link?type=getLink&hash=${segments[0]}`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.message === "Hash not found") {
          router.push("/");
        } else {
          router.push(data.url);
        }
      } catch (error: any) {
        console.error("Error al procesar la solicitud:", error);
        router.push("/");
      }
    };
    link();
  }, [router, segments]);

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
