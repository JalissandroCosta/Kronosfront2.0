"use client"

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useState } from "react";

type LoginData = {
  login: string;
  password: string;
}

export default function Page() {
  const [loginData, setLoginData] = useState<LoginData>({
    login: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    console.log("Dados de login:", loginData);
    // Aqui você pode fazer a requisição de login
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-[350px] p-4 px-2">
        <CardHeader className="space-y-1 py-1">
          <CardTitle className="text-center">LOGIN KRONOS</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-3">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="login">CPF</Label>
                <Input
                  id="login"
                  placeholder="Insira seu CPF"
                  value={loginData.login}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Insira sua senha"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end py-2">
          <Button className="cursor-pointer" type="submit" form="login-form">
            Entrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
