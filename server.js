import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios';
const app = express();



const port = process.env.PORT || 5000;
const HF_API_KEY = process.env.HF_API_KEY;


app.use(express.json())
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const HF_API_URL = "https://api-inference.huggingface.co/models/";



const models = {
    summarization: "facebook/bart-large-cnn",
    classification: "distilbert-base-uncased-finetuned-sst-2-english",
};


app.post('/analyse', async (req, res) => {
    const { logs } = req.body;

    if (!logs) {
        return res.status(400).json({ error: 'Logs or error file are required' });
    }

    let summary = 'Summary not available';
    let codeFixSuggestion = 'Code fix not available';

    try {
        console.log('Processing logs:', logs);

        // Summarization
        try {
            const summaryResponse = await axios.post(
                `${HF_API_URL}${models.summarization}`,
                { inputs: logs },
                { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
            );
            summary = summaryResponse.data[0]?.summary_text || 'No summary generated';
        } catch (err) {
            console.error('Error in summarization API:', err.response?.data || err.message);
        }
        

        // Code Fix  with Gemini Api 
        try {
            const prompt = `Analyze the following logs and generate just code to fix the issues and it should just be for javascript:\n\n${logs},`;
            const codeFixResponse = await model.generateContent(prompt)
            console.log(codeFixResponse)
            codeFixSuggestion = codeFixResponse.response?.text() || 'No code fix generated';
        } catch (err) {
            console.error('Error in code generation API:', err.response?.data || err.message);
        }

        res.json({ summary, codeFix: codeFixSuggestion });
    } catch (err) {
        console.error('Unexpected error:', err.message);
        res.status(500).json({ error: 'Failed to analyze logs.' });
    }
});

app.listen(port, () => {
    console.log(`BugBuddy backend is running on http://localhost:${port}`);
});