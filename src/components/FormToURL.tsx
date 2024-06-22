"use client";
import { useState } from "react";
import Button from "./Button";
import { useSession } from "next-auth/react";

const FormToURL = () => {
  const [formData, setFormData] = useState({
    url: "",
    hashToUrl: "",
  });

  const [crearLink, setCrearLink] = useState(false);
  const { data } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data) {
      setCrearLink(true);
    }

    
  };

  return (
    <div className=" pt-24 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          id="url"
          name="url"
          type="url"
          className=" rounded-[15px] border-2 border-black/opacity-50 px-4 py-2 w-[550px] focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          placeholder="Ingresa URL"
          onChange={handleChange}
          value={formData.url}
          required
        />
        <div className="flex gap-5">
          <input
            id="hashToUrl"
            name="hashToUrl"
            type="text"
            className=" rounded-[15px] border-2 border-black/opacity-50 px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            placeholder="Hash a usar para el enlace (max 10)"
            onChange={handleChange}
            value={formData.hashToUrl}
            maxLength={10}
            required
          />
          <Button button="red" >Cortar &rarr;</Button>
        </div>
      </form>
      {crearLink ? (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div 
          onClick={()=>{setCrearLink(false)}}
          
          className="absolute top-0 left-0 h-screen w-screen bg-black opacity-80"></div>

          <div className="relative bg-white z-10 py-7 md:px-8 px-4 rounded-2xl my-2">
            <h3 className="md:text-lg text-base text-center pb-4 font-semibold">
              Necesitas iniciar sesión para crear un link
            </h3>
            <div className="flex justify-end">
              <Button click={()=>{setCrearLink(false)}} button="principal">cerrar</Button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}


    </div>
  );
};

export default FormToURL;
