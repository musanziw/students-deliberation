"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/services/axios.service";
import Table from "@/components/Table";

export default function Page() {
  const [search, setSearch] = React.useState<string>("");
  const [students, setStudents] = React.useState<any[]>([]);
  const router = useRouter();
  const headers = ["Noms", "Matricule", "Status", "Promotion", "Filière", "Actions"];
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
    axiosInstance.get("students", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setStudents(res.data.students);
      });
  }, [router]);


  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function displayData(students: any[]) {
    return students.map((student, index) => (
      <tr key={index} className="bg-white border-b">
        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
          <div>
            <div className="text-base font-semibold">{student.name}</div>
            <div className="font-normal text-gray-500">{student.email}</div>
          </div>
        </th>
        <td className="px-6 py-4">
          {student.personal_number}
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full bg-${student.is_active ? 'green' : 'red'}-500 mr-2`}></div>
            { student.is_active ? 'Actif' : 'Inactif' }
          </div>

        </td>
        <td className="px-6 py-4">
          Licence {student.promotion}
        </td>
        <td className="px-6 py-4">
          {student.field.name}
        </td>

        <td className="px-6 py-4 flex gap-2">
          <a href="#" className="inline-block font-medium text-blue-600 hover:underline">Editer</a>
          <a href="#" className="inline-block font-medium text-red-600 hover:underline">Supprimer</a>
        </td>
      </tr>
    ));
  }

  return (
    <Table headers={headers} displayData={displayData} data={students} search={search} setSearch={handleSearch} />
  );
}