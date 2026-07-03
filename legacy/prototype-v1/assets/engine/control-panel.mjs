function renderControl(control, value) {
  if (control.type === "toggle") {
    return `
      <label class="demo-toggle">
        <input type="checkbox" data-control-input="${control.key}" ${value ? "checked" : ""} />
        <span>${control.label}</span>
      </label>
    `;
  }

  if (control.type === "select") {
    return `
      <div class="demo-slider-row">
        <div class="demo-slider-header">
          <label for="control-${control.key}">${control.label}</label>
        </div>
        <select id="control-${control.key}" data-control-input="${control.key}">
          ${(control.options ?? []).map((option) => `
            <option value="${option.value}" ${option.value === value ? "selected" : ""}>${option.label}</option>
          `).join("")}
        </select>
      </div>
    `;
  }

  return `
    <div class="demo-slider-row">
      <div class="demo-slider-header">
        <label for="control-${control.key}">${control.label}</label>
        <span data-control-value="${control.key}">${formatControlValue(control, value)}</span>
      </div>
      <input
        id="control-${control.key}"
        data-control-input="${control.key}"
        type="range"
        min="${control.min}"
        max="${control.max}"
        step="${control.step}"
        value="${value}"
      />
    </div>
  `;
}

export function formatControlValue(control, value) {
  if (control.format) return control.format(value);
  if (typeof value === "number") return value.toFixed(control.decimals ?? 2);
  return String(value);
}

export function renderControlPanel(container, controls, params) {
  container.innerHTML = controls.map((control) => renderControl(control, params[control.key])).join("");
}

export function bindControlPanel(container, controls, params, onChange) {
  controls.forEach((control) => {
    const input = container.querySelector(`[data-control-input="${control.key}"]`);
    if (!input) return;

    input.addEventListener("input", () => {
      let nextValue;
      if (control.type === "toggle") nextValue = input.checked;
      else if (control.type === "select") nextValue = input.value;
      else nextValue = parseFloat(input.value);
      onChange(control.key, nextValue);
    });
  });

  syncControlPanel(container, controls, params);
}

export function syncControlPanel(container, controls, params) {
  controls.forEach((control) => {
    const input = container.querySelector(`[data-control-input="${control.key}"]`);
    const valueEl = container.querySelector(`[data-control-value="${control.key}"]`);
    const value = params[control.key];

    if (input) {
      if (control.type === "toggle") {
        input.checked = Boolean(value);
      } else if (control.type === "select") {
        input.value = value;
      } else {
        input.value = value;
      }
    }

    if (valueEl) {
      valueEl.textContent = formatControlValue(control, value);
    }
  });
}
