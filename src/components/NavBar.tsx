import Button from "./Button";
import { getServerSession } from "next-auth";
import Image from "next/image";

const NavBar = async () => {
  const session = await getServerSession();
  // console.log(session);
  return (
    <div className="pt-10 flex justify-between  items-end">
      <a href="/">

      <h1 className="text-black font-bold text-2xl md:text-4xl">
        JDR<span className="text-rose-600">LINK</span>
      </h1>
      </a>

      <div className="flex  gap-4 ">
        {session ? (
          <>
            <Button button="red2.0">
              <a href="/misLinks">Mis Links</a>
            </Button>
            <Button func="signOut" button="ghost">
              Logout
            </Button>
            <Image 
            width={40}
            height={40}
            className="w-10 h-10 p-1 rounded-full ring-2 ring-rose-600" src={session.user?.image|| ""} alt="avatar"/>
          </>
        ) : (
          <>
            <Button func="signIn" button="principal">
              Iniciar Sesión
            </Button>
            {/* <Button button="principal">Register</Button> */}
          </>
        )}

      </div>
    </div>
  );
};
export default NavBar;
