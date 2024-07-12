export class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ callback, once: false });
  }

  subscribeOnce(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ callback, once: true });
  }

  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb.callback !== callback);
    }
  }

  unsubscribeAll(event) {
    if (this.events[event]) {
      this.events[event] = [];
    }
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((listener, index) => {
        listener.callback(data);
        if (listener.once) {
          this.events[event].splice(index, 1);
        }
      });
    }
  }

  subscribeNamespace(namespace, callback) {
    Object.keys(this.events).forEach(event => {
      if (event.startsWith(namespace)) {
        this.subscribe(event, callback);
      }
    });
  }

  unsubscribeNamespace(namespace, callback) {
    Object.keys(this.events).forEach(event => {
      if (event.startsWith(namespace)) {
        this.unsubscribe(event, callback);
      }
    });
  }

  publishNamespace(namespace, data) {
    Object.keys(this.events).forEach(event => {
      if (event.startsWith(namespace)) {
        this.publish(event, data);
      }
    });
  }
}

export default new PubSub();
  