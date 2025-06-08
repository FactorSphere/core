document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("submitBtn");
  button.addEventListener("click", async () => {
    const abstract = document.getElementById("abstractInput").value.trim();
    if (!abstract) return alert("Please paste an abstract.");

    const response = await fetch("http://127.0.0.1:5000/recommend", {
 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ abstract })
    });

    const results = await response.json();
    displayResults(results);
  });
});

function displayResults(journals) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (journals.length === 0) {
    container.innerHTML = "<p>No matches found.</p>";
    return;
  }

  journals.forEach(j => {
    const card = document.createElement("div");
    card.className = "journal-card";
    card.innerHTML = `
      <h3>${j["OA_Journal Name"]}</h3>
      <p><strong>Publisher:</strong> ${j["OA_Publisher"]}</p>
      <p><strong>Discipline:</strong> ${j["OA_Discipline"]}</p>
      <p><strong>SJR Rank:</strong> ${j["SCIMAGO_SJR"]}</p>
      <a href="${j["OA_Homepage"]}" target="_blank">Journal Homepage</a>
    `;
    container.appendChild(card);
  });
}
