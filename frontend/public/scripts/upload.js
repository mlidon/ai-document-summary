document.addEventListener("DOMContentLoaded", () => {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const selectBtn = document.getElementById("selectBtn");
  const summaryBox = document.getElementById("summaryBox");

  const downloadBtn = document.getElementById("downloadBtn");
  const viewBtn = document.getElementById("viewBtn");
  const modal = document.getElementById("modalViewer");
  const modalBody = document.getElementById("modalBody");
  const closeModal = document.getElementById("closeModal");

  let lastSummary = "";
  let lastFileName = "";

  // Abrir selector
  selectBtn.addEventListener("click", () => fileInput.click());

  // Selección manual
  fileInput.addEventListener("change", (e) => {
    handleFile(e.target.files[0]);
  });

  // Drag & Drop
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragging");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragging");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragging");
    handleFile(e.dataTransfer.files[0]);
  });

  // Formateo básico del resumen
  function formatSummary(text) {
    text = text.replace(/^### (.*$)/gim, "<h4>$1</h4>");
    text = text.replace(/^## (.*$)/gim, "<h3>$1</h3>");
    text = text.replace(/^# (.*$)/gim, "<h2>$1</h2>");
    text = text.replace(/^\* (.*$)/gim, "<li>$1</li>");
    text = text.replace(/^\- (.*$)/gim, "<li>$1</li>");
    text = text.replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>");
    text = text.replace(/\n/gim, "<br/>");
    return text;
  }

  // Enviar archivo al backend
  async function handleFile(file) {
    if (!file) return;

    lastFileName = file.name;

    summaryBox.innerHTML = `
      <div class="loader"></div>
      <p class="loading-text">Procesando documento…</p>
      <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
      </div>
    `;

    const progressBar = document.getElementById("progressBar");

    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + 5, 90);
      progressBar.style.width = progress + "%";
    }, 200);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/summarize", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      progressBar.style.width = "100%";

      const data = await res.json();
      lastSummary = data.summary;

      summaryBox.innerHTML = `
        <h3>${file.name}</h3>
        <p class="meta">${data.pages ? `${data.pages} páginas analizadas` : ""}</p>
        <div class="formatted-summary">${formatSummary(data.summary)}</div>
      `;

    } catch (err) {
      clearInterval(interval);
      summaryBox.innerHTML = `<p class="error">Error procesando el documento.</p>`;
    }
  }

  // Descargar PDF
  downloadBtn.addEventListener("click", () => {
  if (!lastSummary) return;

  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Resumen</title>
      </head>
      <body>
        ${formatSummary(lastSummary)}
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);

  iframe.onload = () => {
    iframe.contentWindow.print();
    URL.revokeObjectURL(url);
  };
});


  // Ver documento completo (modal)
  viewBtn.addEventListener("click", () => {
    if (!lastSummary) return;

    modalBody.innerHTML = formatSummary(lastSummary);
    modal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
