import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import NewsFeed from "@/components/NewsFeed";
import PayoutTable from "@/components/PayoutTable";
import { Chart } from "chart.js/auto";
import { saveAs } from "file-saver";
import Papa from "papaparse";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function Dashboard({ session }) {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("news");
  const [chartInstance, setChartInstance] = useState(null);
  const isAdmin = session?.user?.email === "admin@gmail.com";

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const exportToCSV = () => {
    const csv = Papa.unparse(
      filteredArticles.map(({ title, author, publishedAt, url }) => ({
        title,
        author,
        publishedAt,
        url,
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "news_export.csv");
  };

  const renderChart = () => {
    const ctx = document.getElementById("newsChart");
    if (!ctx) return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const dataByDate = {};
    filteredArticles.forEach((article) => {
      const date = new Date(article.publishedAt).toLocaleDateString();
      dataByDate[date] = (dataByDate[date] || 0) + 1;
    });

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(dataByDate),
        datasets: [
          {
            label: "# of Articles",
            data: Object.values(dataByDate),
            backgroundColor: "#4F46E5",
          },
        ],
      },
    });

    setChartInstance(newChart);
  };

  useEffect(() => {
    if (filteredArticles.length > 0 && activeSection === "analytics") {
      renderChart();
    }
  }, [filteredArticles, activeSection]);

  return (
    <div className={`min-h-screen p-6 flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <aside className="w-1/5 p-4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li
            onClick={() => setActiveSection("news")}
            className={`cursor-pointer ${activeSection === "news" ? "font-bold text-blue-600" : ""}`}
          >
            📃 Latest News
          </li>
          {isAdmin && (
            <>
              <li
                onClick={() => setActiveSection("analytics")}
                className={`cursor-pointer ${activeSection === "analytics" ? "font-bold text-blue-600" : ""}`}
              >
                📊 News Analytics
              </li>
              <li
                onClick={() => setActiveSection("payout")}
                className={`cursor-pointer ${activeSection === "payout" ? "font-bold text-blue-600" : ""}`}
              >
                💰 Payout Table
              </li>
            </>
          )}
        </ul>

        <div className="mt-6 space-y-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={exportToCSV}
            className="w-full px-4 py-2 text-sm rounded bg-green-600 text-white hover:bg-green-700"
          >
            Export News to CSV
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-4/5 pl-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {session?.user?.name || session?.user?.email}
        </h1>

        {activeSection === "news" && (
          <>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
              <p>This is the dashboard content visible to all logged-in users.</p>
            </div>
            <NewsFeed onFilterUpdate={setFilteredArticles} />
          </>
        )}

        {isAdmin && activeSection === "analytics" && filteredArticles.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">News Analytics</h2>
            <canvas id="newsChart" height="100"></canvas>
          </div>
        )}

        {isAdmin && activeSection === "payout" && filteredArticles.length > 0 && (
          <div className="mt-10">
            <PayoutTable articles={filteredArticles} />
          </div>
        )}
      </main>
    </div>
  );
}
