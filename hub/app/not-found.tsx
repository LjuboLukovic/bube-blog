import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 pt-8 bg-secondary">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl text-muted-foreground">
          404 - Tražena stranica ne postoji
        </h1>
        <div className="text-center mt-6">
          <img
            src="/404.svg"
            alt=""
            width={400}
            className="max-w-full mx-auto my-6"
          />
          <Link href="/">
            <Button variant="default">Nazad</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
