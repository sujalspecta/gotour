"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { navItems, headerOneNavItems } from "@/data/navItems";
import DemoPages from "@/components/common/DemoPages/DemoPages";
import main_logo from "@/assets/images/logo-dark.png";
import { usePathname } from "next/navigation";
import useStore from "@/store/useStore";
import useScrollUp from "@/hooks/useScrollUp";

interface NavItem {
  id: number;
  title: string;
  link?: string;
  subMenu?: NavItem[];
}

const HeaderOneCloned: React.FC = () => {
  const scrollToTop = useScrollUp(500);
  const pathname = usePathname();

  const {
    changeSearchPopupStatus,
    changeMobileDrawerStatus,
    changeSideBarDrawerStatus,
  } = useStore();

  const renderSubMenu = (subMenu: NavItem[]) => (
    <ul>
      {subMenu.map((item: NavItem, index: number) => (
        <li
          key={item.id ?? index}
          className={item.subMenu ? "dropdown" : ""}
        >
          <Link href={item.link || "#"}>{item.title}</Link>

          {item.subMenu && renderSubMenu(item.subMenu)}
        </li>
      ))}
    </ul>
  );

  const handleClick = () => {
    changeMobileDrawerStatus();
    console.log("clicked");
  };

  const nav =
    pathname === "/home1-one" || pathname === "/home3-one"
      ? headerOneNavItems
      : navItems;

  return (
    <header
      className={`main-header main-header--one sticky-header sticky-header--normal sticky-header--cloned${
        scrollToTop ? " active" : ""
      }`}
    >
      <div className="container-fluid">
        <div className="main-header__inner">
          {/* Logo */}
          <div className="main-header__logo logo-retina">
            <Link href="/">
              <Image
                src={main_logo}
                alt="gotur NextJs"
                width={160}
                height={45}
                style={{
                  width: "160px",
                  height: "auto",
                }}
                className="header-logo"
                priority
              />
            </Link>
          </div>

          {/* Right Side */}
          <div className="main-header__right">
            {/* Navigation */}
            <nav className="main-header__nav main-menu">
              <ul className="main-menu__list">
                {/* Home */}
                <li className="dropdown megamenu">
                  <Link href="/">Home</Link>
                  <DemoPages />
                </li>

                {/* Dynamic Navigation */}
                {nav.map((item: NavItem) => (
                  <li
                    className={`${item.subMenu ? "dropdown" : ""} ${
                      pathname === item.link ? "current" : ""
                    }`}
                    key={item.id}
                  >
                    <Link href={item.link || "#"}>
                      {item.title}
                    </Link>

                    {item.subMenu && renderSubMenu(item.subMenu)}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Info */}
            <div className="main-header__info">
              {/* Search */}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changeSearchPopupStatus();
                }}
                className="search-toggler main-header__info__item"
              >
                <i
                  className="icon-search-interface-symbol"
                  aria-hidden="true"
                ></i>

                <span className="sr-only">Search</span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="main-header__info__item"
              >
                <i
                  className="icon-shopping-carts"
                  aria-hidden="true"
                ></i>

                <span className="sr-only">Cart</span>
              </Link>
            </div>

            {/* Sidebar Button */}
            <div
              className="main-header__btn-popup main-header__element__btn"
              onClick={changeSideBarDrawerStatus}
              role="button"
              tabIndex={0}
              aria-label="Open sidebar menu"
            >
              <i className="icon-menu-bar"></i>
            </div>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="gotur-btn main-header__btn"
            >
              Get in touch
              <i className="icon-paper-plane"></i>
            </Link>

            {/* Mobile Menu Button */}
            <div
              className="mobile-nav__btn mobile-nav__toggler"
              onClick={handleClick}
              role="button"
              tabIndex={0}
              aria-label="Open mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOneCloned;
