"use client";
import { useState } from "react";
import Button from "./Button";

const FormToURL = () => {
  const [formData, setFormData] = useState({
    url: "",
    hashToUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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
          <Button  button="red">Cortar &rarr;</Button>
        </div>
      </form>
    </div>
  );
};

export default FormToURL;
