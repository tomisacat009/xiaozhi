export function renderTeachingPanel(container, items = []) {
  container.innerHTML = items
    .map((item) => `
      <article class="demo-teaching-card">
        <span class="demo-teaching-title">${item.title}</span>
        <strong class="demo-teaching-value">${item.value}</strong>
        ${item.badges?.length ? `<div class="demo-badge-row">${item.badges.map((badge) => `<span class="demo-badge">${badge}</span>`).join("")}</div>` : ""}
        ${item.text ? `<p class="demo-teaching-text">${item.text}</p>` : ""}
      </article>
    `)
    .join("");
}

export function renderExplanationPanel(container, cards = []) {
  container.innerHTML = cards
    .map((card) => `
      <article class="demo-info-card ${card.highlight ? "is-highlight" : ""}">
        <span class="demo-info-label">${card.title}</span>
        <strong>${card.conclusion}</strong>
        ${card.observation ? `<p>${card.observation}</p>` : ""}
        ${card.warning ? `<p class="demo-warning">${card.warning}</p>` : ""}
      </article>
    `)
    .join("");
}

export function renderMessage(container, message) {
  container.textContent = message;
}
