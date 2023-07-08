"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/services/axios.service";
import Table from "@/components/Table";

export default function Page() {
  const [search, setSearch] = React.useState<string>("");
  const [courses, setCourses] = React.useState<any[]>([]);
  const router = useRouter();
  const headers = ["Nom", "Filières", "Heures", "Crédits", "Professeur", "Actions"];
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
    axiosInstance.get("courses", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setCourses(res.data.courses);
      });
  }, [router]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function displayData(courses: any[]) {
    return courses.map((course, index) => (
      <tr key={index} className="bg-white border-b">
        <td className="px-6 py-4">
          {course.name}
        </td>
        <td className="px-6 py-4">
          {course.fields.map((field: any) => field?.name).join(", ")}
        </td>
        <td className="px-6 py-4">
          {course.hours}
        </td>
        <td className="px-6 py-4">
          {course.credits}
        </td>
        <td className="px-6 py-4">
          {course.teacher.name}
        </td>
        <td className="px-6 py-4 flex gap-2">
          <a href="#" className="inline-block font-medium text-blue-600 hover:underline">Editer</a>
          <a href="#" className="inline-block font-medium text-red-600 hover:underline">Supprimer</a>
        </td>
      </tr>
    ));
  }

  return (
    <Table headers={headers} displayData={displayData} data={courses} search={search} setSearch={handleSearch} />
  );
}