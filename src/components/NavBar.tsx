import Button from "./Button";

const NavBar = () => {
  return (
    <div className="pt-10 flex justify-between  items-end">
      <h1 className="text-black font-bold text-2xl md:text-4xl">
        JDR<span className="text-rose-600">LINK</span>
      </h1>

      <div className="flex gap-10 ">
        <Button button="ghost">Login</Button>
        <Button button="principal">Register</Button>
      </div>
    </div>
  );
};
export default NavBar;
