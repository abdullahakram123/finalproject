const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

console.log("HELLO ROUTE LOADED");

router.get("/test", (req, res) => {
    res.send("Router working!");
});

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/ask", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }]
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI request failed" });
    }
});

module.exports = router;
