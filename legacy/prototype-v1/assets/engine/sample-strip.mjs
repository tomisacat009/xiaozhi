export function renderSampleStrip(container, presets, activePresetId) {
  if (!presets.length) {
    container.innerHTML = `<p class="demo-empty-hint">这个演示器暂时没有配置典型样例。</p>`;
    return;
  }

  container.innerHTML = presets
    .map((preset) => `
      <button
        class="demo-chip ${preset.id === activePresetId ? "is-active" : ""}"
        type="button"
        data-preset-id="${preset.id}"
      >
        ${preset.label}
      </button>
    `)
    .join("");
}

export function bindSampleStrip(container, onSelect) {
  container.querySelectorAll("[data-preset-id]").forEach((button) => {
    button.addEventListener("click", () => {
      onSelect(button.dataset.presetId);
    });
  });
}

export function syncSampleStrip(container, activePresetId) {
  container.querySelectorAll("[data-preset-id]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.presetId === activePresetId);
  });
}
