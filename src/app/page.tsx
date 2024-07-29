import NavBar from "@/components/NavBar";
import Image from "next/image";
import FormToURL from "@/components/FormToURL";
export default function Home() {
  return (
    <main className="relative">
      <NavBar />

      <div className="pt-16  md:pb-0 pb-36 ">
        <div className="">
          <h2 className="font-bold  text-3xl md:text-6xl text-center md:text-left md:w-1/2 w-full">
            Simplifica tus <span className=" text-red-600">enlaces</span>,
            Acorta Comparte, Impacta.
          </h2>
          <FormToURL />
        </div>

        <div className="absolute top-24  right-0 -z-10 opacity-80 md:visible invisible">
          <Image
            src="/home.png"
            width={700}
            height={700}
            alt="home"
            className="rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
