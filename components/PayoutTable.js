import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function PayoutTable({ articles }) {
  const [authorStats, setAuthorStats] = useState([]);
  const [rates, setRates] = useState({});

  useEffect(() => {
    const stats = {};
    articles.forEach((article) => {
      const author = article.author || "Unknown Author";
      stats[author] = (stats[author] || 0) + 1;
    });
    setAuthorStats(Object.entries(stats));
  }, [articles]);

  useEffect(() => {
    const storedRates = JSON.parse(localStorage.getItem("payoutRates")) || {};
    setRates(storedRates);
  }, []);

  useEffect(() => {
    localStorage.setItem("payoutRates", JSON.stringify(rates));
  }, [rates]);

  const handleRateChange = (author, rate) => {
    setRates((prev) => ({ ...prev, [author]: Number(rate) }));
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ["Author", "Articles", "Rate", "Total Payout"];
    const rows = authorStats.map(([author, count]) => {
      const rate = rates[author] || 0;
      return [author, count, rate, rate * count];
    });
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payouts.csv";
    link.click();
  };

  // PDF Export
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Payout Table", 10, 10);
    let y = 20;
    doc.text("Author", 10, y);
    doc.text("Articles", 60, y);
    doc.text("Rate", 110, y);
    doc.text("Total Payout", 150, y);
    y += 10;
    authorStats.forEach(([author, count]) => {
      const rate = rates[author] || 0;
      doc.text(String(author), 10, y);
      doc.text(String(count), 60, y);
      doc.text(String(rate), 110, y);
      doc.text(String(rate * count), 150, y);
      y += 10;
    });
    doc.save("payouts.pdf");
  };

  // Google Sheets Export
  const exportToGoogleSheets = async () => {
    // Example: get accessToken from your auth provider/session
    const accessToken = process.env.NEXT_PUBLIC_GOOGLE_ACCESS_TOKEN;
    const data = [
      ["Author", "Articles", "Rate", "Total Payout"],
      ...authorStats.map(([author, count]) => {
        const rate = rates[author] || 0;
        return [author, count, rate, rate * count];
      }),
    ];

    const res = await fetch('/api/export-to-sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, accessToken }),
    });

    if (res.ok) {
      alert('Exported to Google Sheets!');
    } else {
      alert('Failed to export to Google Sheets.');
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Payout Table</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Articles</th>
            <th className="border px-4 py-2">Rate</th>
            <th className="border px-4 py-2">Total Payout</th>
          </tr>
        </thead>
        <tbody>
          {authorStats.map(([author, count]) => {
            const rate = rates[author] || 0;
            return (
              <tr key={author}>
                <td className="border px-4 py-2">{author}</td>
                <td className="border px-4 py-2">{count}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={rate}
                    className="border rounded px-2 py-1 w-20"
                    onChange={(e) => handleRateChange(author, e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">₹ {rate * count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Export Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export as CSV
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export as PDF
        </button>
        <button
          onClick={exportToGoogleSheets}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Export to Google Sheets
        </button>
      </div>
    </div>
  );
}
