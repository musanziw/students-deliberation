"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { axiosInstance } from "@/services/axios.service";
import Table from "@/components/Table";

export default function Page() {
  const [search, setSearch] = React.useState<string>("");
  const [users, setUsers] = React.useState<any[]>([]);
  const router = useRouter();
  const headers = ["Noms", "Rôles", "Status", "Actions"];
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
    axiosInstance.get("users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setUsers(res.data.users);
      })
      .catch(err => {
        console.log(err);
      });
  }, [router]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }


  function displayData(users: any[]) {
    return users.map((user, index) => (
      <tr key={index} className="bg-white border-b">
        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
          <div>
            <div className="text-base font-semibold">{user.name}</div>
            <div className="font-normal text-gray-500">{user.email}</div>
          </div>
        </th>
        <td className="px-6 py-4">
          {user.roles.map((role: any) => role?.name).join(", ")}
        </td>
        <td className="px-6 py-4">
          {
            user.is_active ? (
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                Actif
              </div>
            ) : (
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                Inactif
              </div>
            )
          }
        </td>
        <td className="px-6 py-4 flex gap-2">
          <a href="#" className="inline-block font-medium text-blue-600 hover:underline">Editer</a>
          <a href="#" className="inline-block font-medium text-red-600 hover:underline">Supprimer</a>
        </td>
      </tr>
    ));
  }

  return (
    <Table headers={headers} displayData={displayData} data={users} search={search} setSearch={handleSearch} />
  );
}