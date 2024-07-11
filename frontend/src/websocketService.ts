import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:8081");

client.onopen = () => {
  console.log("WebSocket Client Connected");
};

client.onclose = () => {
  console.log("WebSocket Client Disconnected");
};

export const sendMessage = (message: string) => {
  if (client.readyState === W3CWebSocket.OPEN) {
    client.send(message);
  }
};

export const onMessage = (callback: (message: string) => void) => {
  client.onmessage = (message) => {
    callback(message.data);
  };
};
