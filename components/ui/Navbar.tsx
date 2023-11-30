"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "../auth/AccountMenu";
import clsx from "clsx";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";

const TOP_OFFSET = 66;

type Props = {};

const Navbar = (props: Props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    console.log("Clicked");

    setShowAccountMenu((prev) => !prev);
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={clsx(
          "px-4 md:px-16 py-6 flex flex-row items-center transition duration-500",
          {
            "bg-zinc-900 bg-opacity-90": showBackground,
          }
        )}
      >
        <img src={"/images/logo.png"} alt="logo" className="h-4 lg:h-7" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={clsx("text-white transition", {
              "transform rotate-180 -translate-y-2": showMobileMenu,
            })}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch className="text-xl" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell className="text-xl" />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="profile-avatar" />
            </div>
            <BsChevronDown
              className={clsx("text-white transition", {
                "transform rotate-180 -translate-y-2": showAccountMenu,
              })}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
