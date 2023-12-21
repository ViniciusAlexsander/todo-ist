"use client";

import { Button } from "@/components/Button";
import LoginImg from "@/shared/assets/imgs/login-img.svg";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-screen-lg w-full flex items-center justify-between gap-10 p-10 sm:py-36">
        <div>
          <h1 className="text-3xl font-bold mb-10">Login</h1>
          <Button onClick={() => signIn("github")} fullWidth>
            Continuar com Github
          </Button>
          <div className="mt-4 underline">
            <a href="">Esqueceu sua senha?</a>
          </div>
          <div className="mt-3">
            Ao continuar com o Google ou Github você está concordando com os{" "}
            <a className="underline" href="">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a className="underline" href="">
              Política de Privacidade
            </a>{" "}
            do Todoist.
          </div>
        </div>
        <div className="max-w-screen-sm hidden sm:flex">
          <Image src={LoginImg} alt="Login image" />
        </div>
      </div>
    </div>
  );
}
