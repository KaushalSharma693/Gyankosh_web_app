import { useEffect, useState } from "react";
import axios from "axios";
import "./UploadBook.css";

export default function UploadBook() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [books, setBooks] = useState([]);

  const load = async () => {
    const res = await axios.get("https://gyankosh-web-app.onrender.com/books");
    setBooks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async () => {
    if (!title || !file) return alert("All fields required");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("image", file);

    try {
      await axios.post("https://gyankosh-web-app.onrender.com/upload", fd);
      alert("Uploaded");
      setTitle("");
      setFile(null);
      load();
    } catch (e) {
      if (e.response?.status === 409) alert("Book already exists");
      else alert("Upload failed");
    }
  };

  return (
    <div className="library-container">
      <div className="upload-box">
        <h2>📤 Upload Book</h2>
        <input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={upload}>Upload</button>
      </div>

      <div className="library-title">📚 Library</div>

      <div className="book-grid">
        {books.map((b) => (
          <div className="book-card" key={b.title}>
            <h4>{b.title}</h4>
            <a href={b.pdf_url} target="_blank" rel="noreferrer">
              <button className="download-btn">Download PDF</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
