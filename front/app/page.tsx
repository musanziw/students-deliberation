"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../public/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "@/services/axios.service";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Home() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProcessing(true);
    const res = await axiosInstance.post("login", {
        email,
        password
      }
    ).catch((err) => {
      if (err.response) {
        setTimeout(() => setProcessing(false), 500);
        toast.error(err.response.data.message);
      } else {
        toast.error("Une erreur est survenue");
        setTimeout(() => setProcessing(false), 500);
      }
    });
    if (res) {
      setTimeout(() => setProcessing(false), 500);
      console.log(res.data);
      toast.success('Connexion réussi')
      localStorage.setItem("token", res.data.token);
    }
  }

  return (
    <main className={"h-screen flex flex-col items-center justify-center text-md md:text-lg"}>
      <ToastContainer />
      <Image src={logo} width={200} height={200} alt={"Logo"} placeholder="blur" className={"h-auto w-auto"}
             blurDataURL={"/logo.jpg"} />
      <form action="" className={"flex flex-col gap-y-5 p-10 border shadow-md"}
            onSubmit={handleSubmit}>

        <Input type={"email"} name={"email"} placeholder={"Email"} value={email} label={"Email"}
               onChange={(e) => setEmail(e.target.value)}
               required={true} />
        <Input type={"password"} name={"password"} placeholder={"Mot de passe"} value={password} label={"Mot de passe"}
               onChange={(e) => setPassword(e.target.value)}
               required={true} />

        <Button type={"submit"} className={"mt-3 bg-blue-500"} disabled={processing} onClick={handleSubmit} proccessing={processing}>
          {
            processing ? "Connexion..." : "Se connecter"
          }
        </Button>
      </form>
    </main>
  );
}
