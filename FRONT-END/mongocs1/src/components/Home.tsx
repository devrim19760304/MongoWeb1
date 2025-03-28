import { useState, useEffect } from "react";

interface Data {
  message: string;
  pageversion: string;
  status: string;
  debug: string;
}

const Home = () => {
  // Initialize state with a Data type
  const [data, setData] = useState<Data | null>(null); // Initialize as null initially

  useEffect(() => {
    fetch("http://localhost:5140/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center mt-5">Home Page</h1>
      {data ? (
        <>
          <h2>{data.message}</h2>
          <p>Version {data.pageversion}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Home;
