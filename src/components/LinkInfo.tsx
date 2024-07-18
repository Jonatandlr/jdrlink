"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

type Link = {
  id: string;
  hash: string;
  URL: string;
  createdAt: string;
};

const LinkInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [dataLink, setDataLink] = useState<Link>({
    id: "",
    hash: "",
    URL: "",
    createdAt: "",
  });

  const fecthData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/link?type=getLink&hash=${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.message === "Hash not found") {
        console.log("Hash not found");
      } else {
        setDataLink(data.url);
      }
    } catch (error: any) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-center">Link Info</h1>
      <div className=" flex justify-center">
        {dataLink.id ? (
          <div className="flex md:flex-row flex-col justify-center items-center mt-10 bg-white border border-black shadow-[5px_8px_5px_-2px] shadow-black/50 p-5 rounded-lg w-fit">
            <div>
              <div>
                <p className="text-rose-600 font-semibold">Url Original</p>
                <p className=" rounded-[15px] border-2 border-black/opacity-50 px-4 py-2 ">
                  {dataLink.URL}
                </p>
              </div>

              <div>
                <p className="text-rose-600 font-semibold">Hash</p>
                <p className=" rounded-[15px] border-2 border-black/opacity-50 px-4 py-2 ">
                  {dataLink.hash}
                </p>
              </div>
              <div>
                <p className="text-rose-600 font-semibold">Link Cortado</p>
                <p className=" rounded-[15px] border-2 border-black/opacity-50 px-4 py-2 ">
                  {process.env.NEXT_PUBLIC_URL}/{dataLink.hash}
                </p>
              </div>
            </div>

            <div className="px-5 md:py-0 py-5">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${process.env.NEXT_PUBLIC_URL}/${dataLink.hash}`}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        ) : (
          <p>Link not found</p>
        )}
      </div>
    </div>
  );
};
export default LinkInfo;
