import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";

export default function CadastroPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#eef3e9] px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-xl border border-[#dce5d8] bg-white p-6 shadow-[0_20px_60px_rgba(20,61,50,0.10)] sm:p-9" aria-labelledby="cadastro-title">
        <div className="flex justify-center">
          <BrandLogo markClassName="h-9 w-9" wordmarkClassName="text-xl" />
        </div>

        <div className="mt-8 text-center">
          <h1 id="cadastro-title" className="text-3xl font-black text-foreground">Criar cadastro</h1>
          <p className="mt-2 text-sm text-muted-foreground">Faça parte do Fechô.</p>
        </div>

        <div className="mt-8 space-y-4">
          <input type="text" placeholder="Username" aria-label="Username" className="h-12 w-full rounded-md border bg-[#fbfcf9] px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground" />
          <input type="email" placeholder="E-mail" aria-label="E-mail" className="h-12 w-full rounded-md border bg-[#fbfcf9] px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground" />
          <input type="password" placeholder="Password" aria-label="Password" className="h-12 w-full rounded-md border bg-[#fbfcf9] px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground" />
          <input type="password" placeholder="Confirmar password" aria-label="Confirmar password" className="h-12 w-full rounded-md border bg-[#fbfcf9] px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground" />
        </div>

        <button type="button" className="mt-7 h-12 w-full rounded-md bg-foreground px-5 text-sm font-bold text-white transition hover:opacity-90">
          Criar cadastro
        </button>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Já tenho cadastro{" "}
          <Link href="/login" className="font-bold text-foreground underline underline-offset-4">Entrar</Link>
        </p>
      </section>
    </main>
  );
}
