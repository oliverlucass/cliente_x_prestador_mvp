import { BrandLogo } from "@/components/brand/brand-logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#eef3e9] px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-xl border border-[#dce5d8] bg-white p-6 shadow-[0_20px_60px_rgba(20,61,50,0.10)] sm:p-9" aria-labelledby="login-title">
        <div className="flex justify-center">
          <BrandLogo markClassName="h-9 w-9" wordmarkClassName="text-xl" />
        </div>

        <div className="mt-8 text-center">
          <h1 id="login-title" className="text-3xl font-black text-foreground">Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Entre para continuar no Fechô.</p>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Username"
            aria-label="Username"
            className="h-12 w-full rounded-md border bg-[#fbfcf9] px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground"
          />
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            className="h-12 w-full rounded-md border bg-[#fbfcf9] px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground"
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-xs font-semibold text-muted-foreground">
          <span>Esqueceu a senha?</span>
          <Link href="/cadastro" className="font-semibold text-foreground underline underline-offset-4">Não tenho cadastro</Link>
        </div>

        <div className="mt-7 space-y-3">
          <button type="button" className="h-12 w-full rounded-md bg-foreground px-5 text-sm font-bold text-white transition hover:opacity-90">
            Entrar
          </button>
          <button type="button" className="h-12 w-full rounded-md border border-foreground bg-white px-5 text-sm font-bold text-foreground transition hover:bg-muted">
            Entrar com
          </button>
        </div>
      </section>
    </main>
  );
}
