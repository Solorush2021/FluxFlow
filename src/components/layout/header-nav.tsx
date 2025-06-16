"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserCircle, Settings } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <Link href="/" className="hidden md:block">
             <Logo />
          </Link>
        </div>
        <div className="md:hidden flex-1 flex justify-center">
           <Link href="/">
             <Logo />
           </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="User Account">
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
