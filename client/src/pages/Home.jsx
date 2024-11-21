import { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
import RadialPercentageChart from "../components/RadialPercentageChart";
import PieChart from "../components/PieChart";
import SavedBooks from "../components/SavedBooks";

export default function Home() {
  const [pagesRead, setPagesRead] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const books = [];

  useEffect(() => {
    fetch("/api/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const categoryCounts = {};
          for (const book of data.books) {
            const categories = book.categories;
            for (const category of categories) {
              if (categoryCounts[category]) {
                categoryCounts[category]++;
              } else {
                categoryCounts[category] = 1;
              }
            }
          }

          const formattedCategoriesData = Object.keys(categoryCounts).map((key) => ({
            label: key,
            value: categoryCounts[key],
          }));

          setCategoriesData(formattedCategoriesData);
        })
      }
    })
  }, []);

  // const handleSave = () => {
  //   fetch("/api/books", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   }).then((response) => {
  //     if (response.ok) {
  //       console.log("Book data saved");
  //     } else {
  //       console.log("Failed to save book data");
  //     }
  //   });
  // };

  return (
    <div>
      <div style={{height: '50px'}}></div>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        {/* {categoriesData ? <BarChart /> : null}
        <RadialPercentageChart /> */}
        {/* <figure
          className="flex flex-col p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          style={{
            width: "350px",
            margin: "0 auto",
            paddingLeft: "50px",
            height: "350px",
            display: "flex",
          }}
        >
          {pagesRead.length > 0 ? <BarChart data={pagesRead}/> : null}
        </figure> */}
        <figure
          className="flex flex-col p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          style={{
            width: "350px",
            margin: "0 auto",
            paddingLeft: "50px",
            height: "350px",
            display: "flex",
          }}
        >
          {categoriesData.length > 0 ? <PieChart data={categoriesData}/> : null}
        </figure>
      </div>
      <SavedBooks />
    </div>
  )
}