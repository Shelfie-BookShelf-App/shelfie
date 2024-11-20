import { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
import RadialPercentageChart from "../components/RadialPercentageChart";
import PieChart from "../components/PieChart";

export default function Home() {
  const handleSave = () => {
    fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        console.log("Book data saved");
      } else {
        console.log("Failed to save book data");
      }
    });
  };

  return (
    <div className="px-12 flex justify-center space-x-20 mt-5">
      <BarChart />
      <PieChart />
      <RadialPercentageChart />
      <button onClick={handleSave}>Test</button>
    </div>
  );
}
