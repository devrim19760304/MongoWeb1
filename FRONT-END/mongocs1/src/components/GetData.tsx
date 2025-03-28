import { useState, useEffect } from "react";

// Interface for record
interface Record {
  id: string;
  name: string;
  age: number;
  city: string;
}

const GetData = () => {
  const [data, setData] = useState<Record[]>([]);

  useEffect(() => {
    fetch("http://localhost:5140/showrecords")
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Set the data state with the fetched data
        console.log(data); // Log the fetched data for debugging
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Get Data From Back-end
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Age</th>
              <th className="py-2 px-4 border-b border-gray-200">City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">
                  {record.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {record.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {record.age}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {record.city}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetData;
