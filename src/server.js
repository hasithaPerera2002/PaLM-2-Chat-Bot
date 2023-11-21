import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import * as https from "https";

config()
const app = express();
const PORT = process.env.PORT || 5000;
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_API_URL = ` https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${LLM_API_KEY}`;

app.use(express.json());
app.use(cors());
app.get('/api/prompt/:text', async (req, res) => {
  const message = req.params.text;
  const payload = {
    prompt: {
      "messages": [{
        content: message
      }]
    },
    temperature:0.1
  }

  const response = await fetch(
    LLM_API_URL,{
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(payload),
      method:'POST'
    }
  );

  let newVar = await response.json();
  res.send(newVar);

})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


