import NavBar from "@/components/NavBar";
import Image from "next/image";
import FormToURL from "@/components/FormToURL";
export default function Home() {
  return (
    <main>
      <NavBar />

      <div className="pt-16 bg-[url('/homeopacity.png')] bg-center bg-no-repeat md:bg-none">
        <div className="">
          <h2 className="font-bold  text-3xl md:text-6xl text-center md:text-left ">
            Simplifica tus <span className=" text-red-600">enlaces</span>,
            Acorta Comparte, Impacta.
          </h2>
          <FormToURL />
        </div>

        <div className="absolute top-24  right-24 -z-10 opacity-80 md:visible invisible">
          <Image
            src="/home.png"
            width={500}
            height={500}
            alt="home"
            className="rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
