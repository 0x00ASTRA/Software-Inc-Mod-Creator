// components.js
customElements.define(
  "input-line",
  class extends HTMLElement {
    constructor() {
      super();

      // Get attributes
      this.id =
        this.getAttribute("id") ||
        this.getAttribute("data-id") ||
        this.getAttribute("label")
          ?.toLowerCase()
          .replace(/[^a-z0-9]/g, "-") ||
        "input-" + crypto.randomUUID();
      const label = this.getAttribute("label") || "Label";
      const placeholder = this.getAttribute("placeholder") || "";
      const infoMsg = this.getAttribute("info-msg") || "";

      // Create the HTML structure
      this.innerHTML = `
        <div class="input-line">
          <label for="input-field" class="label">${label}</label>
          <div class="input-container">
            <input type="text" id="input-field" placeholder="${placeholder}">
            <div class="info-tooltip">
              <img src="static/images/Info-grey.png" alt="Info" class="info-icon">
              <div class="info-msg">${infoMsg}</div>
            </div>
          </div>
        </div>
      `;

      // Get stored value and set it
      const storedValue = sessionStorage.getItem(`input-line-${this.id}`);
      if (storedValue) {
        this.querySelector("#input-field").value = storedValue;
      }

      // Add input event listener to store value
      this.querySelector("#input-field").addEventListener("input", (e) => {
        sessionStorage.setItem(`input-line-${this.id}`, e.target.value);
      });
    }
  }
);

customElements.define(
  "title-navbar",
  class extends HTMLElement {
    constructor() {
      super();

      const title = this.getAttribute("title") || "Page Title";
      const subtitle = this.getAttribute("subtitle") || "";
      const description = this.getAttribute("description") || "";

      this.innerHTML = `
            <h1 class="page-title">${title}</h1>
            <p class="created-by">Software By Astraeus</p>

            <a href="home" class="button-icon" id="home-navlink">
              Home<img src="static/images/Home.png" alt="Home" class="">
            </a>
            <hr class="separator">
            <div class="spacer"></div>
            <h2 class="page-subtitle">${subtitle}</h2>
            <p>${description}</p>
            <div class="spacer"></div>
        `;
    }
  }
);

document.addEventListener("DOMContentLoaded", () => {
  customElements.define(
    "simca-table",
    class extends HTMLElement {
      constructor() {
        super();
        this.id =
          this.getAttribute("id") ||
          this.getAttribute("data-id") ||
          this.getAttribute("label")
            ?.toLowerCase()
            .replace(/[^a-z0-9]/g, "-") ||
          "table-" + crypto.randomUUID();
        this.columns = JSON.parse(this.getAttribute("columns") || "{}");

        // Load entries from session storage or use default
        const storedEntries = sessionStorage.getItem(`simca-table-${this.id}`);
        this.entries = storedEntries
          ? JSON.parse(storedEntries)
          : JSON.parse(this.getAttribute("entries") || "[]");
      }

      saveToStorage() {
        sessionStorage.setItem(
          `simca-table-${this.id}`,
          JSON.stringify(this.entries)
        );
      }

      addRow() {
        const newRow = {};
        Object.keys(this.columns).forEach((col) => (newRow[col] = ""));
        this.entries.push(newRow);
        this.saveToStorage();
        this.render();
      }

      removeRow(index) {
        this.entries.splice(index, 1);
        this.saveToStorage();
        this.render();
      }

      updateEntry(index, key, value, input) {
        let parsedValue = value;
        switch (this.columns[key]) {
          case "number":
            if (/^-?\d*\.?\d*$/.test(value) || value === "" || value === ".") {
              parsedValue = value;
            } else {
              parsedValue = this.entries[index][key] || "";
              input.value = parsedValue;
            }
            break;
          case "string":
          default:
            parsedValue = value.toString();
            break;
        }
        this.entries[index][key] = parsedValue;
        this.saveToStorage();
      }

      render() {
        const label = this.getAttribute("label") || "Table";
        const description =
          this.getAttribute("description") || "Table description.";

        this.innerHTML = `
          <div>
            <h2 id="label" class="label">${label}</h2>
            <p id="description" class="description">${description}</p>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    ${Object.keys(this.columns)
                      .map((col) => `<th>${col}</th>`)
                      .join("")}
                    <th class="actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.entries
                    .map(
                      (entry, index) => `
                    <tr>
                      ${Object.keys(this.columns)
                        .map(
                          (col) => `
                        <td><input type="text" value="${entry[col] || ""}" 
                          oninput="this.closest('simca-table').updateEntry(${index}, '${col}', this.value, this);"></td>
                      `
                        )
                        .join("")}
                      <td class="actions">
                        <button class="remove-btn" onclick="this.closest('simca-table').removeRow(${index});">Remove</button>
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
              <div class="add-container">
                <button class="add-btn" onclick="this.closest('simca-table').addRow();">Add Row</button>
              </div>
            </div>
          </div>
        `;
      }

      connectedCallback() {
        this.render();
      }
    }
  );
});

class ToggleSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.id =
      this.getAttribute("id") ||
      this.getAttribute("data-id") ||
      this.getAttribute("label")
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, "-") ||
      "toggle-" + crypto.randomUUID();
    this.isOn = sessionStorage.getItem(`toggle-switch-${this.id}`) === "true";
  }

  static get observedAttributes() {
    return ["label", "description"];
  }

  connectedCallback() {
    this.label = this.getAttribute("label") || "Switch";
    this.description = this.getAttribute("description") || "";

    const style = document.createElement("style");
    style.textContent = `
      .container {
          max-width: 78%;
          padding: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }

      .text-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
      }

      .label {
          font-weight: bold;
          color: #333;
      }

      .description {
          font-size: 14px;
          color: #666;
      }

      .switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
          flex-shrink: 0;
      }

      .switch input {
          opacity: 0;
          width: 0;
          height: 0;
      }

      .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
      }

      .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 21px;
          border-radius: 50%;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
      }

      input:checked + .slider {
          background-color: #82CD9B;
      }

      input:checked + .slider:before {
          transform: translateX(23px);
      }
    `;

    const html = document.createElement("div");
    html.className = "container";
    html.innerHTML = `
      <div class="text-content">
          <div class="label">${this.label}</div>
          ${
            this.description
              ? `<div class="description">${this.description}</div>`
              : ""
          }
      </div>
      <label class="switch">
          <input type="checkbox" ${this.isOn ? "checked" : ""}>
          <span class="slider"></span>
      </label>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(html);

    this.checkbox = this.shadowRoot.querySelector("input");
    this.checkbox.addEventListener("change", () => {
      this.isOn = this.checkbox.checked;
      sessionStorage.setItem(`toggle-switch-${this.id}`, this.isOn);
      this.dispatchEvent(
        new CustomEvent("toggle", {
          bubbles: true,
          composed: true,
          detail: { checked: this.isOn },
        })
      );
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "label") {
      this.label = newValue;
      const labelEl = this.shadowRoot.querySelector(".label");
      if (labelEl) labelEl.textContent = newValue;
    }
    if (name === "description") {
      this.description = newValue;
      let descEl = this.shadowRoot.querySelector(".description");
      if (descEl) descEl.textContent = newValue;
    }
  }
}

customElements.define("toggle-switch", ToggleSwitch);

customElements.define(
  "input-range-slider",
  class extends HTMLElement {
    constructor() {
      super();

      // Get attributes
      this.id =
        this.getAttribute("id") ||
        this.getAttribute("data-id") ||
        this.getAttribute("label")
          ?.toLowerCase()
          .replace(/[^a-z0-9]/g, "-") ||
        "slider-" + crypto.randomUUID();
      const label = this.getAttribute("label") || "Label";
      const min = parseFloat(this.getAttribute("min")) || 0;
      const max = parseFloat(this.getAttribute("max")) || 100;
      const prefix = this.getAttribute("prefix") || "";
      const suffix = this.getAttribute("suffix") || "";
      const description = this.getAttribute("description") || "";
      const step =
        this.getAttribute("step") || (min !== 0 && max !== 100 ? 0.01 : 1);

      // Get stored value or use default
      const storedValue = sessionStorage.getItem(`range-slider-${this.id}`);
      const defaultValue =
        storedValue !== null
          ? parseFloat(storedValue)
          : parseFloat(this.getAttribute("default-value")) || min;

      // Create the HTML structure
      this.innerHTML = `
        <div class="input-range-slider">
          <label for="input-range" class="label">${label}</label>
          <div class="slider-container">
            <input type="range" id="input-range" min="${min}" max="${max}" value="${defaultValue}" step="${step}" class="range-slider">
            <div class="range-values">
              <span class="prefix">${prefix}</span><span id="range-display" class="range-display">${defaultValue}</span><span class="suffix">${suffix}</span>
            </div>
          </div>
          <div class="description">${description}</div>
        </div>
      `;

      // Add event listener to update the display and store value
      const slider = this.querySelector("#input-range");
      slider.addEventListener("input", (event) => {
        const value = parseFloat(event.target.value);
        this.querySelector("#range-display").textContent = value.toFixed(2);
        sessionStorage.setItem(`range-slider-${this.id}`, value);

        // Update the background based on the value
        const percent = ((value - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #82CD9B ${percent}%, #ddd ${percent}%)`;
      });

      // Initialize background color and display
      const initialValue = slider.value;
      const initialPercent = ((initialValue - min) / (max - min)) * 100;
      slider.style.background = `linear-gradient(to right, #82CD9B ${initialPercent}%, #ddd ${initialPercent}%)`;
    }
  }
);

customElements.define(
  "dropdown-select",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      // Use provided ID, data-id, or generate a stable one based on attributes
      this.stableId =
        this.getAttribute("id") ||
        this.getAttribute("data-id") ||
        this.getAttribute("label")
          ?.toLowerCase()
          .replace(/[^a-z0-9]/g, "-") ||
        "dropdown-" +
          this.getAttribute("api-endpoint")?.replace(/[^a-z0-9]/g, "-");
    }

    async connectedCallback() {
      await this.render();
      await this.fetchOptions();
    }

    async render() {
      const style = `
        .dropdown-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: sans-serif;
        }
        .dropdown-label {
          font-weight: bold;
          color: #333;
        }
        select {
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
      `;

      this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="dropdown-container">
          <label class="dropdown-label">${
            this.getAttribute("label") || "Select an option"
          }</label>
          <select id="dropdown"></select>
        </div>
      `;

      this.dropdown = this.shadowRoot.getElementById("dropdown");

      // Add change event listener
      this.dropdown.addEventListener("change", (e) => {
        console.log(`Saving value for ${this.stableId}:`, e.target.value);
        sessionStorage.setItem(this.stableId, e.target.value);
      });
    }

    async fetchOptions() {
      try {
        const response = await fetch(
          this.getAttribute("api-endpoint") || "/api/v1/name-generators"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const options = data.map((item) => ({
          name: item["name-generator"],
          id: item["generator-id"],
        }));

        // Render options
        let optionsHtml = '<option value="">Select...</option>';
        optionsHtml += options
          .map(
            (option) => `<option value="${option.id}">${option.name}</option>`
          )
          .join("");

        this.dropdown.innerHTML = optionsHtml;

        // Restore the saved value
        const storedValue = sessionStorage.getItem(this.stableId);
        console.log(`Restoring value for ${this.stableId}:`, storedValue);

        if (storedValue) {
          this.dropdown.value = storedValue;
          console.log("Value restored to:", this.dropdown.value);
        }
      } catch (error) {
        console.error("Dropdown fetch error:", error);
      }
    }

    get value() {
      return this.dropdown?.value || "";
    }

    set value(newValue) {
      if (this.dropdown) {
        this.dropdown.value = newValue;
        sessionStorage.setItem(this.stableId, newValue);
      }
    }
  }
);

customElements.define(
  "icon-btn",
  class extends HTMLElement {
    constructor() {
      super();

      // Get attributes
      const icon = this.getAttribute("icon") || "static/images/Plus.png"; // Default icon
      const infoMsg = this.getAttribute("info-msg") || ""; // Info message on hover
      const defaultColor = this.getAttribute("default-color") || "#E0E0E0"; // Default icon color
      const hoverColor = this.getAttribute("hover-color") || "#82CD9B"; // Hover icon color
      const glow = this.getAttribute("glow") || "0 0 8px #82CD9B"; // Glow effect on hover
      const route = this.getAttribute("route") || "/name-generator"; // Route to navigate to on click

      // Create the HTML structure
      this.innerHTML = `
        <div class="icon-btn-container">
          <button class="icon-btn">
            <img src="${icon}" alt="Icon" class="icon">
          </button>
          ${infoMsg ? `<div class="info-tooltip">${infoMsg}</div>` : ""}
        </div>
      `;

      // Add styles dynamically
      const style = document.createElement("style");
      style.textContent = `
        .icon-btn-container {
          position: relative;
          display: inline-block;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: filter 0.3s ease;
        }

        .icon-btn img {
          width: 24px;
          height: 24px;
          filter: brightness(0) saturate(100%) invert(85%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%);
          transition: filter 0.3s ease;
        }

        .icon-btn:hover img {
          filter: brightness(0) saturate(100%) invert(73%) sepia(40%) saturate(400%) hue-rotate(90deg) brightness(90%) contrast(90%);
          filter: drop-shadow(${glow});
        }

        .info-tooltip {
          visibility: hidden;
          background-color: #555;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          margin-left: -60px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .icon-btn-container:hover .info-tooltip {
          visibility: visible;
          opacity: 1;
        }
      `;
      this.appendChild(style);

      // Add click event listener
      const button = this.querySelector(".icon-btn");
      button.addEventListener("click", () => {
        window.location.href = route; // Navigate to the specified route
      });
    }
  }
);