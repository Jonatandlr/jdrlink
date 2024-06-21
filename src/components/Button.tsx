import clsx from "clsx";


interface ButtonProps {
    children: React.ReactNode;
    button?:  "principal" |"red" | "ghost" | "red2.0";
}

const Button =({children,button}:ButtonProps) => {
  return <button 
  
  className={clsx("font-semibold rounded-xl px-4 py-2 transition-all duration-300  text-base", {
    "hover:bg-red-600 hover:text-white border ": button === "principal",
    "hover:bg-slate-100 hover:text-red-600": button === "ghost",
    "bg-red-600 text-white hover:bg-red-500": button === "red",
    "hover:bg-red-600 hover:text-white text-red-600 border ": button === "red2.0",





})}>{children}</button>;
  
}

export default Button;