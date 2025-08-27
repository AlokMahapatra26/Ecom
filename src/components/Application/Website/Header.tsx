"use client"

import { USER_DASHBOARD, USER_SHOP, WEBSITE_HOME, WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import Link from 'next/link'
import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import Cart from '@/components/Application/Website/Cart'
import { VscAccount } from "react-icons/vsc"
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { HiMiniBars3 } from "react-icons/hi2"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const Header = () => {
  const auth = useSelector((store: any) => store.authStore.auth)

  const navLinks = [
    { href: WEBSITE_HOME, label: "Home" },
    { href: "#", label: "About" },
    { href: USER_SHOP, label: "Shop" },
    { href: "#", label: "Bags" },
    { href: "#", label: "Saree" },
    { href: "#", label: "Material" },
  ]

  return (
    <header className="border-b bg-background">
      <div className="flex justify-between items-center lg:px-32 px-4 lg:py-5 py-3">
        {/* Logo */}
        <Link href={WEBSITE_HOME} className="text-lg font-semibold">
          Rudra Silk Saree
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <button type="button">
            <IoIosSearch
              size={22}
              className="cursor-pointer text-muted-foreground hover:text-primary transition-colors"
            />
          </button>

          <Cart />

          {!auth ? (
            <Link href={WEBSITE_LOGIN}>
              <VscAccount
                size={24}
                className="text-muted-foreground hover:text-primary transition-colors"
              />
            </Link>
          ) : (
            <Link href={USER_DASHBOARD}>
              <Avatar>
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" className="lg:hidden block">
                <HiMiniBars3
                  size={24}
                  className="text-muted-foreground hover:text-primary transition-colors"
                />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="flex flex-col gap-6 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
