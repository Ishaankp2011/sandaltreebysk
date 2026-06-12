"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Images,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Instagram,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/instagram", label: "Instagram", icon: Instagram },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/content", label: "Content", icon: Settings },
];

interface AdminSidebarProps {
  userEmail: string;
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="block">
          <p className="font-serif text-xl font-light">Sandal Tree</p>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary font-medium mt-0.5">
            by SK — Admin
          </p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-sans font-medium transition-all duration-200 group",
              isActive(item)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            aria-current={isActive(item) ? "page" : undefined}
          >
            <item.icon size={16} aria-hidden />
            {item.label}
            {isActive(item) && (
              <ChevronRight size={14} className="ml-auto" aria-hidden />
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border">
        <div className="px-4 py-3 mb-2">
          <p className="font-sans text-xs text-muted-foreground truncate">
            {userEmail}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-sans font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          aria-label="Sign out of admin panel"
        >
          <LogOut size={16} aria-hidden />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-card flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background border border-border shadow-sm"
        aria-label="Open admin menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="relative w-72 bg-background border-r border-border h-full flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
              aria-label="Close admin menu"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
