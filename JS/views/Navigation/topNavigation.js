// Constants for event names
const EVENTS = {
    DELETE_ITEM: 'deleteItem',
  };
  
  export class AppView {
    constructor(pubSub) {
      this.pubSub = pubSub;
      this.app = document.getElementById('app');
      this.historyList = document.createElement('ul');
      this.app.appendChild(this.historyList);
  
      // Subscribing to events
      this.pubSub.subscribe('dataAdded', this.render.bind(this));
      this.pubSub.subscribe('dataDeleted', this.render.bind(this));
      this.pubSub.subscribe('dataDeletedAll', this.render.bind(this));
    }
  
    render(history) {
      this.historyList.innerHTML = '';
      history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `Query: ${item.query}, Country Code: ${item.countryCode}, ID: ${item.id}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => this.pubSub.publish(EVENTS.DELETE_ITEM, item.id);
        listItem.appendChild(deleteButton);
        this.historyList.appendChild(listItem);
      });
    }
  }
  