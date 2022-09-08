import React, { useEffect, useState } from "react";
import "./NewsBar.css";
import { newsApi } from "../utils/api";

function NewsBar() {
  const [news, setNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm === "") {
        const res = await newsApi.get(`/api/v1/news/getAllDocuments`);
        setNews(res.data);
      } else {
        const res = await newsApi.get(
          `/api/v1/news/searchTerm?term=` + searchTerm.replace(" ", "-")
        );
        setNews(res.data);
      }
    };
    fetchData();
  }, [searchTerm]);

  function NewsMapper() {
    return news.map((n, idx) => {
      return (
        <div className="news__block" key={`news_${idx}`}>
          <a
            href={n.url}
            target="_blank"
            rel="noreferrer"
            className={`news__headline`}
          >
            {n.headline}
          </a>
        </div>
      );
    });
  }

  return (
    <div className="newsbar">
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="search__bar"
      >
        <input
          type="text"
          name="search__input"
          className="search__input"
          placeholder="Search"
          id=""
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>

      <nav className="newsbar__nav">{news && <NewsMapper />}</nav>
    </div>
  );
}

export default NewsBar;
