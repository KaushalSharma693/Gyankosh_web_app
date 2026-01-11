import React, { useState } from "react";
import "./DailyWords.css";
import mediumWords from "../data/medium_level_words.json" ;// ✅ use your new file

const DailyWords = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDailyWords = async () => {
    setLoading(true);
    setWords([]);

    try {
      // Shuffle medium-level words
      const shuffled = mediumWords.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);

      const cleanWords = [];

      for (let word of selected) {
        try {
          const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          const data = await res.json();
          const meaning = data[0]?.meanings?.[0]?.definitions?.[0]?.definition;

          if (meaning) {
            cleanWords.push({ word, meaning });
          }
        } catch {
          // skip if fetch fails
        }
      }

      setWords(cleanWords);
    } catch (err) {
      console.error("Error fetching words:", err);
    }

    setLoading(false);
  };

  return ( 
    <>
    <div className="daily-container">
      <div className="heading-word"><h1>TRY OUR NEW FEATURE</h1></div>
      <h2>📚 Learn 10 English Words </h2>
      <button onClick={getDailyWords}>Get 10 Words</button>

      {loading && <p>Loading words...</p>}

      <div className="cards-grid">
        {words.map((item, index) => (
          <div key={index} className="word-card">
            <h3>{item.word}</h3>
            <p><strong>Meaning:</strong> {item.meaning}</p>
            <p>
              <strong>Hindi:</strong>{" "}
              <a
                href={`https://translate.google.com/?sl=en&tl=hi&text=${encodeURIComponent(
                  item.word
                )}&op=translate`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Translate
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default DailyWords;
