import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import { Audio } from "react-loader-spinner";

import Scheduler from "./components/Scheduler";
import EventList from "./components/EventList";
import { treeViewData } from "./util/data";

import "./App.css";
import html2canvas from "html2canvas";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const ANIME_TOKEN = process.env.REACT_APP_ANIME_API_TOKEN;
const IMDB_TOKEN = process.env.REACT_APP_IMDB_TOKEN;
const GAME_TOKEN = process.env.REACT_APP_GAMES_API_TOKEN;

const App = () => {
  const [scheduleObj, setScheduleObj] = useState(new ScheduleComponent({}));
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<{ [key: string]: Object }[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        // get github data
        /* const repoResult = await axios.get(
          "https://api.github.com/users/fahnucc/repos",
          {
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
          }
        );
        const githubData: any[] = [
          {
            id: 8,
            name: "GitHub Repos",
            hasChild: true,
            expanded: false,
          },
        ];
        repoResult.data.forEach((repo: any) => {
          githubData.push({
            id: repo.id,
            pid: 8,
            name: repo.name,
            url: repo.url,
            has_issues: repo.has_issues,
          });
        });
        githubData.sort((a, b) => a.name.localeCompare(b.name));

        for (var repo in githubData) {
          if (repo == "0") continue;
          if (githubData[repo].has_issues) {
            const issueResult = await axios.get(
              githubData[repo].url + "/issues",
              {
                headers: {
                  Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
              }
            );

            issueResult.data.forEach((issue: any) => {
              githubData.push({
                id: issue.id,
                pid: githubData[repo].id,
                name: issue.title,
              });
            });
            githubData.sort((a, b) => a.name.localeCompare(b.name))
          }
        }; */
        // get github data

        // get anime data
        const animeResult = await axios.get(
          "https://api.aniapi.com/v1/anime",
          {
            headers: {
              Authorization: `Bearer ${ANIME_TOKEN}`,
            },
          }
        );
        const animeData: any[] = [
          {
            id: 9,
            name: "Animes",
            hasChild: true,
            expanded: false,
          },
        ];
        animeResult.data.data.documents.forEach((anime: any) => {
          if (anime.titles.en != null) {
            animeData.push({
              id: anime.anilist_id,
              pid: 9,
              name: anime.titles.en,
            });
          }
        });
        animeData.sort((a, b) => a.name.localeCompare(b.name))
        // get anime data

        // get movie data
        const movieResult = await axios.get(
          "https://imdb-api.com/en/API/Top250Movies/" + IMDB_TOKEN,
        );
        const movieData: any[] = [
          {
            id: 10,
            name: "IMDB Top 250 Movies",
            hasChild: true,
            expanded: false,
          },
        ];
        movieResult.data.items.forEach((movie: any) => {
          movieData.push({
            id: movie.id,
            pid: 10,
            name: movie.title,
          });
        });
        // get movie data

        // get series data
        const seriesResult = await axios.get(
          "https://imdb-api.com/en/API/Top250TVs/" + IMDB_TOKEN,
        );
        const seriesData: any[] = [
          {
            id: 11,
            name: "IMDB Top 250 Series",
            hasChild: true,
            expanded: false,
          },
        ];
        seriesResult.data.items.forEach((series: any) => {
          seriesData.push({
            id: series.id,
            pid: 11,
            name: series.title,
          });
        });
        // get series data

        // get game data
        const gameResult = await axios.get(
          "https://api.rawg.io/api/games?key=" + GAME_TOKEN,
        );
        const gameData: any[] = [
          {
            id: 12,
            name: "Games",
            hasChild: true,
            expanded: false,
          },
        ];
        gameResult.data.results.forEach((game: any) => {
          gameData.push({
            id: game.id,
            pid: 12,
            name: game.name,
          });
        });
        // get game data

        console.log(gameData);

        setData([...treeViewData, /* ...githubData, */ ...animeData, ...gameData, ...movieData, ...seriesData]);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadImage = async () => {
    const element: any = printRef?.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      const fileName = `Weekly Schedule`;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loading-bar">
          <Audio />
          <span>Fetching Remote Data...</span>
        </div>
      )}
      {isError && (
        <div className="loading-bar">
          <span>Error while fetching remote data!</span>
        </div>
      )}
      {!isLoading && !isError && (
        <div className="main-container">
          <div className="scheduler-title-container">geekweek</div>
          <div className="scheduler-component" >
            <div ref={printRef}>
              <Scheduler setScheduleObj={setScheduleObj} />
            </div>
            <div >
              <button onClick={handleDownloadImage} className="save-button">
                <span>Save As Image</span>
                <div className="liquid"></div>
              </button>
            </div>
          </div>
          <div className="treeview-component">
            <EventList treeViewData={data} scheduleObj={scheduleObj} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
