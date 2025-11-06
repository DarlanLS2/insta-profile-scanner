import fetch from 'node-fetch'

export class WebSocket {
  constructor() {
    this.url = "http://127.0.0.1:9222/json/version"
  }
  async getUrl() {
    const res = await fetch(this.url);
    const data = await res.json();
    return data.webSocketDebuggerUrl;
  }
}

