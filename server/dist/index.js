"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use(body_parser_1.default.json());
var messages = [];
// Test route at localhost:5000
app.get("/", (_, res) => {
    res.status(200).send("Hello WAI261");
});
// Get messages
app.get("/messages", (_, res) => {
    res.status(200).send(messages);
});
// Add message
app.post("/addMessage", (req, res) => {
    console.log(req.body);
    // Create new message from info sent
    const newMessage = {
        contents: req.body.contents,
        user: req.body.user,
        time: new Date(req.body.time),
    };
    // Add this new message
    messages.push(newMessage);
    // Request (not waited for to finish) to get AI response to message
    axios_1.default
        .post("https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment", {
        inputs: req.body.contents,
    }, {
        headers: {
            Authorization: "Bearer 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",
        },
    })
        .then((response) => {
        try {
            // Get emotion labels
            const sortedRatings = response.data[0].sort((val1, val2) => val2.score - val1.score);
            var reviewStr;
            if (sortedRatings[0].score < 0.3) {
                reviewStr = "I'm not sure how many stars to give to this review - is it a proper review?";
            }
            else if (sortedRatings[0].score > 0.3 && sortedRatings[0] < 0.6) {
                reviewStr = "I think this review is equivalent to " + sortedRatings[0].label + " out of 5, but I'm not too confident";
            }
            else {
                reviewStr = "I think this review is equivalent to " + sortedRatings[0].label + " out of 5";
            }
            // Create the new message from the "AI"
            let aiMessage = {
                contents: reviewStr,
                user: "AI",
                time: new Date(),
            };
            // Add message
            messages.push(aiMessage);
        }
        catch (e) {
            console.log(e);
        }
    });
    // Send updated messages back (not guaranteed to include new AI message tho)
    res.status(200).send(messages);
});
//# sourceMappingURL=index.js.map