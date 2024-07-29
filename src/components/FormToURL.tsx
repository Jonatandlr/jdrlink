"use client";
import { useState } from "react";
import Button from "./Button";
import { useSession } from "next-auth/react";
import Image from "next/image";

const FormToURL = () => {
  const [formData, setFormData] = useState({
    url: "",
    hashToUrl: "",
  });
  const [crearLink, setCrearLink] = useState(false);
  const [loading, setLoading] = useState([false,""]);
  const [finalLink, setFinalLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const { data: sesion } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!sesion) {
      setCrearLink(true);
      return;
    }

    setLoading([true,"Creando link..."]);
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (data.message === "Hash already exist") {
      setFinalLink(data.message);
      setLoading([false,""]);
      return;
    }

    setFinalLink(data.finalLink);
    setLoading([false,""]);
    // console.log(data.finalLink);
  };

  function isValidURL(string: string) {
    const regex =/^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/.*)?$/;
    return regex.test(string);
  }

  const AiButton = async () => {
    if (!sesion) {
      setCrearLink(true);
      return;
    }
    //verify if url exist
    if (formData.url === "" || !isValidURL(formData.url)) {
      return;
    }
    setLoading([true,"Creando hash..."]);
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: formData.url }),
    });
    const data = await response.json();
    setLoading([false,""]);
    setFormData({
      ...formData,
      hashToUrl: data.slug,
    });
  };

  return (
    <div className=" pt-24 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          id="url"
          name="url"
          type="url"
          className=" rounded-[15px] border-2 border-black/opacity-50 px-4 py-2 md:w-[550px] w-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          placeholder="Ingresa URL"
          onChange={handleChange}
          value={formData.url}
          required
        />
        <div className="flex gap-5 md:flex-row flex-col">
          <input
            id="hashToUrl"
            name="hashToUrl"
            type="text"
            className="rounded-[15px] border-2 border-black/opacity-50 px-4 py-2 md:w-96 w-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            placeholder="Hash a usar para el enlace (max 15)"
            onChange={handleChange}
            value={formData.hashToUrl}
            maxLength={15}
            required
          />
          <button
            onClick={AiButton}
            type="button"
            className="hover:bg-slate-100 rounded-[15px] transition-all duration-300"
          >
            <Image src="/AiButton.svg" width={50} height={50} alt="ai" />
          </button>
          <Button type="submit" button="red">
            Cortar &rarr;
          </Button>
        </div>
      </form>

      {crearLink ? (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div
            onClick={() => {
              setCrearLink(false);
            }}
            className="absolute top-0 left-0 h-screen w-screen bg-black opacity-80"
          ></div>

          <div className="relative bg-white z-10 py-7 md:px-8 px-4 rounded-2xl my-2">
            <h3 className="md:text-lg text-base text-center pb-4 font-semibold">
              Necesitas iniciar sesión para crear un link
            </h3>
            <div className="flex justify-end">
              <Button
                click={() => {
                  setCrearLink(false);
                }}
                button="principal"
              >
                cerrar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {loading[0] ? (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="absolute top-0 left-0 h-screen w-screen bg-black opacity-80"></div>
          <div className="relative bg-white z-10 py-7 md:px-8 px-4 rounded-2xl my-2">
            <h3 className="md:text-lg text-base text-center pb-4 font-semibold">
              {loading[1]}
            </h3>
          </div>
        </div>
      ) : (
        <div>
          {finalLink && finalLink != "Hash already exist" ? (
            <div className="flex flex-col  pt-8">
              <div className="relative z-30 flex items-center rounded-[15px] border-2 border-black/opacity-50 px-4 py-2 md:w-[550px] w-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white">
                <input
                  className="flex-1  outline-none"
                  value={finalLink}
                  readOnly
                />
                <button
                  onClick={handleCopy}
                  className="ml-2 p-1 text-black hover:text-red-600 focus:outline-none"
                  aria-label="Copy to clipboard"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-copy"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
                {copied && (
                  <span className="absolute right-7 top-0 mt-2 mr-2 text-green-600">
                    Copied!
                  </span>
                )}
              </div>
              <h3 className="md:w-[550px] w-full text-xl font-semibold  text-rose-600 text-center">
                Aqui esta tu link!
              </h3>
            </div>
          ) : (
            <div>
              {finalLink && finalLink == "Hash already exist" ? (
                <h3 className="md:w-[550px] w-full text-xl font-semibold  text-rose-600 text-center">
                  Hash ya existe!
                </h3>
              ) : (
                <h3 className="md:w-[550px] w-full text-xl font-semibold  text-rose-600 text-center pt-5">
                  Crea tu link!
                </h3>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormToURL;
