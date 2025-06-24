async function searchWord() {
  const word = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if (data.title === "No Definitions Found") {
      resultDiv.innerHTML = "<p>Word not found.</p>";
      return;
    }

    const entry = data[0];
    let html = `<h2>${entry.word}</h2>`;
    
    if (entry.phonetics[0]?.audio) {
      html += `<button onclick="new Audio('${entry.phonetics[0].audio}').play()">🔊 Play</button>`;
    }

    entry.meanings.forEach((meaning) => {
      html += `<h3>${meaning.partOfSpeech}</h3><ul>`;
      meaning.definitions.forEach((def) => {
        html += `<li>${def.definition}</li>`;
      });
      html += "</ul>";
    });

    resultDiv.innerHTML = html;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching definition.</p>`;
  }
}

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Font selection
document.getElementById("fontSelect").addEventListener("change", (e) => {
  document.body.style.fontFamily = e.target.value;
});