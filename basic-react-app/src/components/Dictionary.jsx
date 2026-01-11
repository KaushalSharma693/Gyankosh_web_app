import React, { useState } from "react";
import "./Dictionary.css";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [hindi, setHindi] = useState("");

  const handleSearch = async () => {
    if (!word) return;

    setError("");
    setResult(null);
    setHindi("Translating...");

    try {
      // Step 1: Fetch dictionary data
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();

      if (!data || !data[0]) {
        setError("No results found.");
        setHindi("");
        return;
      }

      const entry = data[0];
      const allMeanings = entry.meanings;

      let meaning = "";
      let example = "";
      let synonyms = new Set();
      let antonyms = new Set();

      allMeanings.forEach((meaningBlock) => {
        meaningBlock.definitions.forEach((def) => {
          if (!meaning && def.definition) meaning = def.definition;
          if (!example && def.example) example = def.example;
          def.synonyms?.forEach((syn) => synonyms.add(syn));
          def.antonyms?.forEach((ant) => antonyms.add(ant));
        });
        meaningBlock.synonyms?.forEach((syn) => synonyms.add(syn));
        meaningBlock.antonyms?.forEach((ant) => antonyms.add(ant));
      });

      // Step 2: Hindi Translation (with fallback)
      let translated = "Translation unavailable";
      try {
        const translateRes = await fetch("https://libretranslate.de/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: meaning,
            source: "en",
            target: "hi",
            format: "text",
          }),
        });

        const hindiData = await translateRes.json();

        if (hindiData?.translatedText) {
          translated = hindiData.translatedText;
        } else {
          // Fallback: Try translating the word itself
          const fallback = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: word,
              source: "en",
              target: "hi",
              format: "text",
            }),
          });
          const fallbackData = await fallback.json();
          translated = fallbackData?.translatedText || "N/A";
        }
      } catch (e) {
        console.warn("Hindi translation failed.");
        translated = "Translation unavailable";
      }

      // Step 3: Set results
      setHindi(translated);
      setResult({
        word: entry.word,
        meaning: meaning || "Not available",
        synonyms: Array.from(synonyms),
        antonyms: Array.from(antonyms),
        example: example || "Not available",
      });
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Error fetching data. Please try again.");
      setHindi("");
    }
  };

  return (
    <div className="dictionary-container">
      <h1>📖 Dictionary</h1>
      <input
        type="text"
        value={word}
        placeholder="Enter a word"
        onChange={(e) => setWord(e.target.value)}
        className="inputwala"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-box">
          <h2>{result.word}</h2>
          <p><strong>Meaning:</strong> {result.meaning}</p>
          <p><strong>Hindi:</strong> {hindi}</p>
          <p><strong>Synonyms:</strong> {result.synonyms.length ? result.synonyms.join(", ") : "N/A"}</p>
          <p><strong>Antonyms:</strong> {result.antonyms.length ? result.antonyms.join(", ") : "N/A"}</p>
          <p><strong>Example:</strong> {result.example}</p>
        </div>
      )}
    </div>
  );
};

export default Dictionary;
