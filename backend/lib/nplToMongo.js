const axios = require('axios');

const systemPrompt = `
You are a MongoDB assistant. Convert natural language into a valid MongoDB filter object.
Schema fields include:
- Title (string)
- Vendor (string)
- Variant Price (number)
- Tags (string)
- Type (string)
- Image Src (string)
- Variant SKU (string)
- Variant Inventory Qty (string),

Only return a valid JSON object with filter keys. No explanation or markdown.
`;

const convertPromptToQuery = async (prompt) => {
  const apiKey = process.env.NVIDIA_API_KEY;
  const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";

  const response = await axios.post(
    invokeUrl,
    {
      model: "mistralai/mistral-medium-3-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.3,
      stream: false
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json"
      }
    }
  );

  let content = response.data.choices[0].message.content.trim();

  // Remove code blocks if wrapped in ```
  const match = content.match(/```(?:json)?([\s\S]+?)```/);
  const json = match ? match[1].trim() : content;

  return JSON.parse(json);
};

module.exports = {
  convertPromptToQuery
};
