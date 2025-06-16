
"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import { SidebarNav } from './sidebar-nav';
import { HeaderNav } from './header-nav';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast'; // Added useToast import

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast(); // Initialize toast
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('sidebar_state='))
        ?.split('=')[1];
      if (cookieValue) {
        setIsSidebarOpen(cookieValue === 'true');
      }
    }
  }, []);
  

  const handleSidebarOpenChange = (open: boolean) => {
    setIsSidebarOpen(open);
    if (typeof document !== 'undefined') {
      document.cookie = `sidebar_state=${open}; path=/; max-age=${60 * 60 * 24 * 7}`; // Cookie expires in 7 days
    }
  };

  const handleLogout = () => {
    console.log("Logout button clicked. Implement actual logout logic here.");
    toast({
      title: "Logged Out (Simulated)",
      description: "You have been successfully logged out.",
      variant: "default", 
    });
    // Add actual logout logic, e.g., redirecting to login page, clearing session
  };


  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={handleSidebarOpenChange} defaultOpen={true}>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border shadow-lg">
        <SidebarHeader className="p-4 items-center justify-between">
           <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
             <Logo className="w-auto h-8 text-primary" />
           </Link>
           <div className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center hidden w-full">
            <Link href="/">
             <Logo className="w-auto h-6 text-primary" />
            </Link>
           </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center"
            onClick={handleLogout} // Added onClick handler
          >
            <LogOut className="h-5 w-5" />
            <span className="font-body group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <HeaderNav />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
