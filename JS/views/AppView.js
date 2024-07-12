

class AppView {
  constructor(pubSub) {
    this.pubSub = pubSub;
    this.historyList = document.getElementById('historyList');
    this.dataDisplay = document.getElementById('dataDisplay');

    this.pubSub.subscribe(EVENTS.DATA_ADDED, (newEntry) => this.renderNewEntry(newEntry));
    this.pubSub.subscribe(EVENTS.DATA_DELETED, (id) => this.removeEntryById(id));
    this.pubSub.subscribe(EVENTS.DATA_DELETED_ALL, () => this.clearAllEntries());
    this.pubSub.subscribe(EVENTS.HISTORY_UPDATED, (history) => this.renderHistory(history));
  }

  renderNewEntry(entry) {
    this.renderHistory([entry]);
    this.renderData(entry.data);
  }

  renderHistory(history) {
    this.historyList.innerHTML = '';
    history.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `Search: ${entry.search.query}, Country: ${entry.search.countryCode}`;
      li.setAttribute('data-id', entry.search.id);
      li.addEventListener('click', () => this.renderData(entry.data));
      this.historyList.appendChild(li);
    });
  }

  renderData(data) {
    this.dataDisplay.innerHTML = `
      <h2>Weather: ${data.weather.description}</h2>
      <h2>Map Coordinates: ${data.mapCoords}</h2>
      <h2>News: ${data.news}</h2>
      <h2>WikiData: ${data.wikiData}</h2>
      <img src="${data.searchUrlImage}" alt="Image">
    `;
  }

  removeEntryById(id) {
    const item = this.historyList.querySelector(`[data-id="${id}"]`);
    if (item) {
      this.historyList.removeChild(item);
    }
  }

  clearAllEntries() {
    this.historyList.innerHTML = '';
    this.dataDisplay.innerHTML = '';
  }
}

export default AppView;

