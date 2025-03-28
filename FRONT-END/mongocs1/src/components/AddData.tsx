import { useState } from "react";

interface Record {
  Name: string;
  Age: number;
  City: string;
}

const AddData = () => {
  // Initialize state with a Record type
  const [inputs, setInputs] = useState<Record>({ Name: "", Age: 0, City: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "Age" ? parseInt(value) : value, // Convert Age to number
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //send post request
    try {
      const response = await fetch("http://localhost:5140/addrecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Record added successfully:", data);
      alert("Record added successfully!");
    } catch (error) {
      console.error("Error adding record:", error);
      alert("Failed to add record.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="Name"
            value={inputs.Name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-lg font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            name="Age"
            value={inputs.Age}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your age"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-lg font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="City"
            value={inputs.City}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your city"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddData;
