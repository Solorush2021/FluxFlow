"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Boxes, Brain, LayoutDashboard, Truck } from 'lucide-react';

import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Boxes,
  },
  {
    title: 'Logistics',
    href: '/logistics',
    icon: Truck,
  },
  {
    title: 'AI Suggestions',
    href: '/ai-suggestions',
    icon: Brain,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              className={cn(
                'w-full justify-start',
                 pathname === item.href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
              )}
              isActive={pathname === item.href}
              tooltip={{ children: item.title, className: 'font-body' }}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span className="font-body">{item.title}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
