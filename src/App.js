import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/v1/health")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Health check failed with status " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Online Platform</h1>

      <h2>Health Check</h2>

      {loading && <p>Checking backend health...</p>}

      {!loading && error && (
        <p style={{ color: "red" }}>
          Backend health check failed: {error}
        </p>
      )}

      {!loading && health && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            borderRadius: "8px",
            maxWidth: "520px",
          }}
        >
          <p><b>Status:</b> {health.status}</p>
          <p><b>Service:</b> {health.service}</p>
          <p><b>Timestamp:</b> {health.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default App;
