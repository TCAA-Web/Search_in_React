import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { Search } from "./components/Search";

function App() {
  const [allShows, setAllShows] = useState();
  const [windowWidth, setWindowWidth] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    let url =
      "http://localhost:3000/events?orderby=title&attributes=image,description,title";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllShows(data));

    // Opret et resize event der opdaterer vores "windowWidth" state
    let windowResize = window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    // Fjern event når komponent un-mounter
    return () => removeEventListener("resize", windowResize);
  }, []);

  useEffect(() => {
    // Search i API med API Kald

    /* let url = `http://localhost:3000/events/search/${search}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSearchResult(data)); */

    // Search i lokalt gemt array med filter
    let result = allShows.filter(
      (show) =>
        show.title.toLowerCase().includes(search.toLowerCase()) ||
        show.stage.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(result);
  }, [search]);

  // Forskellige image sizes til forskellige skærmstørrelser
  const imagePathSmall = "http://localhost:3000/Assets/Images/events/small/";
  const imagePathLarge = "http://localhost:3000/Assets/Images/events/large/";

  return (
    <section>
      <Search setSearch={setSearch} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
        }}
      >
        {!searchResult || searchResult.length == 0
          ? allShows?.map((item) => {
              return (
                <Card
                  image={
                    windowWidth > 600
                      ? imagePathLarge + item.image
                      : imagePathSmall + item.image
                  }
                  title={item.title?.toUpperCase()}
                  stage={item.stage.name}
                />
              );
            })
          : searchResult?.map((item) => {
              return (
                <Card
                  image={
                    windowWidth > 600
                      ? imagePathLarge + item.image
                      : imagePathSmall + item.image
                  }
                  title={item.title?.toUpperCase()}
                  stage={item.stage.name}
                />
              );
            })}
      </div>
    </section>
  );
}

export default App;
