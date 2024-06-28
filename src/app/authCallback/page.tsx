"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const auteticationDB = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/authdb`, {
            method: "POST", // Asegúrate de que estás utilizando el método correcto
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(session),
          });

          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          if (data.message === "success") {
            router.push("/");
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      };

      auteticationDB();
    }
  }, [session, status, router]);

  return (
    <div className="w-full mt-20 flex justify-center">
      <div className="flex flex-col">
        {/* Icono de autenticación */}
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600" />
        </div>
        <h3 className="text-center text-2xl font-bold mt-10">
          Autenticando...
        </h3>
      </div>
    </div>
  );
}
