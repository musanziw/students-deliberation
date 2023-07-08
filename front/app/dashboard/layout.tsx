"use client";
import React, { ReactNode } from "react";
import {
  BiArchive,
  BiBook,
  BiShield,
  BiUserPlus
} from "react-icons/bi";
import Link from "next/link";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { CgMathPercent } from "react-icons/cg";
import { GiTeacher } from "react-icons/gi";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [activeLink, setActiveLink] = React.useState(0);

  function handleActiveLink(index: number) {
    setActiveLink(index);
  }

  const Links = [
    {
      title: "Utilisateurs",
      icon: <BiUserPlus />,
      href: "/dashboard"
    },
    {
      title: "Rôles",
      icon: <BiShield />,
      href: "/dashboard/roles"
    },
    {
      title: "Cours",
      icon: <BiArchive />,
      href: "/dashboard/courses"
    },
    {
      title: "Etudiants",
      icon: <PiGraduationCapDuotone />,
      href: "/dashboard/students"
    },
    {
      title: "Cotes",
      icon: <CgMathPercent />,
      href: "/dashboard/grades"
    },
    {
      title: "Filières",
      icon: <BiBook />,
      href: "/dashboard/fields"
    },
    {
      title: "Facultés",
      icon: <GiTeacher />,
      href: "/dashboard/faculties"
    }
  ];

  return (
    <div className={"bg-white flex"}>
      <div className="flex flex-col bg-white h-screen p-8 px-12 border-r">
        <h1 className={"text-xl mb-8 font-semibold text-gray-900 leading-9"}>Dashboard</h1>
        {
          Links.map((link, index) => (
            <Link key={index} onClick={() => handleActiveLink(index)} href={link.href}
                  className={`group flex items-center gap-2 leading-6 mb-6 font-semibold ${activeLink == index ? "active" : " "}`}>
              <div
                className={"group-hover:border-sky-100 group-hover:text-sky-500 p-1 text-sky-400 rounded-md border transition-colors duration-100"}>
                {link.icon}
              </div>
              {link.title}
            </Link>
          ))
        }
      </div>
      {children}
    </div>
  );
}