"use client";

import Link from "next/link";
import { Menu, UserCircle } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

function NavItem({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "rounded-full px-5 transition-all duration-200",
        "hover:bg-accent/10 hover:text-accent",
        "active:scale-[0.98]",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav
          className="hidden items-center justify-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open profile"
            className="rounded-full transition-colors hover:bg-accent/10 hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50"
          >
            <UserCircle className="h-6 w-6" aria-hidden="true" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav
                className="mt-6 flex flex-col gap-2"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <NavItem
                      href={link.href}
                      label={link.label}
                      className="justify-start"
                    />
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
