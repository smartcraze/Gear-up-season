'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";  // "next/link" add this here 

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div
    className={cn("fixed  top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
        <Menu setActive={setActive}>
            <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home">
            
            </MenuItem>
            </Link>
            <Link href={"/dashboard"}>
            <MenuItem setActive={setActive} active={active} item="Dashboard">
            
            </MenuItem>
            </Link>
            
            <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us">
            
            </MenuItem>
            </Link>
            <Link href={"/login"}>
            <MenuItem setActive={setActive} active={active} item="Login">
            
            </MenuItem>
            </Link>
            {/* <input type="search" placeholder="Search..." className="px-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-center" /> */}

        </Menu>
    </div>
  )
}

export default Navbar