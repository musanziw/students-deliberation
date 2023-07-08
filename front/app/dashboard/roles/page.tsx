"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/services/axios.service";
import Table from "@/components/Table";

export default function DashboardRoles() {
  const [search, setSearch] = React.useState<string>("");
  const [roles, setRoles] = React.useState<any[]>([]);
  const router = useRouter();
  const headers = ["Nom", "Actions"];
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
    axiosInstance.get("roles", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setRoles(res.data.roles);
      });
  }, [router]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function displayData(roles: any[]) {
    return roles.map((role, index) => (
      <tr key={index} className="bg-white border-b">
        <td className="px-6 py-4">
          {role.name}
        </td>
        <td className="px-6 py-4 flex gap-2">
          <a href="#" className="inline-block font-medium text-blue-600 hover:underline">Editer</a>
          <a href="#" className="inline-block font-medium text-red-600 hover:underline">Supprimer</a>
        </td>
      </tr>
    ));
  }

  return (
    <Table headers={headers} displayData={displayData} data={roles} search={search} setSearch={handleSearch} />
  );
}