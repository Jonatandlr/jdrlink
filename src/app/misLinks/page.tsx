import NavBar from "@/components/NavBar";
import React from "react";

import MisLinksContainer from "@/components/MisLinksContainer";
export default function MisLinks() {
  return (
    <main className="">
      <NavBar />

      <div>
        <h1 className="pt-16  text-3xl font-semibold/opacity-50  opacity-50">
          Mis Links
        </h1>

        <MisLinksContainer />
      </div>
    </main>
  );
}
