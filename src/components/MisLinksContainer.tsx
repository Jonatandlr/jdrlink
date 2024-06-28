"use client";
import React, { useEffect, useState } from "react";
import MisLinkCard from "./MisLinkCard";

type Link = {
  id: string;
  hash: string;
};

export default function MisLinksContainer() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/link?type=getLinks`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${document.cookie}`,
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.links);
        setLinks(data.links);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading)
    return (
      <div className="w-full mt-20 flex justify-center">
        <div className="flex flex-col">
          {/* Icono de autenticación */}
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600" />
          </div>
          <h3 className="text-center text-2xl font-bold mt-10">
            cargando...
          </h3>
        </div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-8">
      {links.map((link: Link, index: number) => (
        <div key={index}>
          <MisLinkCard
            id={link.id}
            title={link.hash}
            link={`${process.env.NEXT_PUBLIC_URL}/${link.hash}`}
          />
        </div>

        // <MisLinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
