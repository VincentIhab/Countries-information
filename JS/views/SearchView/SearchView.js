export default class SuggestionView {
  constructor() {
    this.suggestionsBox = document.getElementById("suggestions");
    this.cityInput = document.getElementById("city");
  }

  displaySuggestions(suggestionsResults) {
    this.suggestionsBox.innerHTML = "";
    const ul = document.createElement("ul");
    suggestionsResults.forEach((list) => {
      const li = document.createElement("li");
      li.textContent = list;
      li.addEventListener("click", () => {
        this.selectInput(li);
      });
      ul.appendChild(li);
    });
    this.suggestionsBox.appendChild(ul);
  }

  selectInput(listItem) {
    this.cityInput.value = listItem.textContent;
    this.cityInput.dispatchEvent(new Event("change"));
  }
}
