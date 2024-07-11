const WebSocket = require("ws");
const axios = require("axios");
require("dotenv").config();

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    console.log("Received:", message.toString());
    const response = await getGPTResponse(message.toString());
    ws.send(response);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const getGPTResponse = async (message) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 40000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error with OpenAI API:",
      error.response ? error.response.data : error.message
    );
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.code === "insufficient_quota"
    ) {
      return "You have exceeded your quota. Please check your plan and billing details.";
    }
    return "Error with OpenAI API";
  }
};
