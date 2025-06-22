import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsFeed({ onFilterUpdate }) {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeFilter, setTypeFilter] = useState(""); // "news" or "blog"

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&language=en&apiKey=c4948403e43943dfbeba1813a56e5c8d`
      )
      .then((res) => {
        setArticles(res.data.articles);
        setFilteredArticles(res.data.articles);

        // Send full data to parent on first fetch
        if (onFilterUpdate) {
          onFilterUpdate(res.data.articles);
        }
      })
      .catch((err) => console.error("Failed to fetch news", err));
  }, []);

  useEffect(() => {
    const filtered = articles.filter((article) => {
      const articleDate = new Date(article.publishedAt);
      const matchesAuthor = authorFilter
        ? article.author?.toLowerCase().includes(authorFilter.toLowerCase())
        : true;

      const matchesSearch = search
        ? article.title?.toLowerCase().includes(search.toLowerCase()) ||
          article.description?.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchesStartDate = startDate
        ? articleDate >= new Date(startDate)
        : true;
      const matchesEndDate = endDate
        ? articleDate <= new Date(endDate)
        : true;

      const matchesType =
        typeFilter === ""
          ? true
          : typeFilter === "blog"
          ? article.title?.toLowerCase().includes("blog") ||
            article.description?.toLowerCase().includes("blog")
          : article.title?.toLowerCase().includes("news") ||
            article.description?.toLowerCase().includes("news");

      return (
        matchesAuthor &&
        matchesSearch &&
        matchesStartDate &&
        matchesEndDate &&
        matchesType
      );
    });

    setFilteredArticles(filtered);

    // Notify parent component with updated filtered list
    if (onFilterUpdate) {
      onFilterUpdate(filtered);
    }
  }, [articles, search, authorFilter, startDate, endDate, typeFilter]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>

      {/* Filters Section */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by keyword"
          className="p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by author"
          className="p-2 border rounded"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="news">News</option>
          <option value="blog">Blog</option>
        </select>
        <input
          type="date"
          className="p-2 border rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button
  onClick={() => {
    setSearch("");
    setAuthorFilter("");
    setStartDate("");
    setEndDate("");
    setTypeFilter("");
  }}
  className="px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600"
>
  Clear Filters
</button>


      {/* Results Section */}
      {filteredArticles.length === 0 ? (
        <p>No matching articles found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredArticles.map((article, index) => (
            <li key={index} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600">
                {article.author || "Unknown Author"} •{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Read More
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
