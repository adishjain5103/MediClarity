import axios from 'axios'
/**
 * Function to call Google Cloud Vertex AI REST API for generating summaries.
 * @param {string} content - The extracted content from the PDF.
 * @returns {Promise<string>} - The generated summary from Vertex AI.
 */

const generateSummary = async (content) => {
    const endpoint = process.env.API_ENDPOINT.replace('{projectId}', process.env.PROJECT_ID).replace('{modelId}', process.env.MODEL_ID);

    const requestBody = {
        instances: [
            {
                prompt: `Summarize the following medical text: ${content}`,
                parameters: {
                    maxOutputTokens: 8192,
                    temperature: 1,
                    topP: 0.95,
                },
            },
        ],
    };

    try {
        const response = await axios.post(endpoint, requestBody, {
            headers: {
                'Authorization': `Bearer ${process.env.GOOGLE_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.predictions[0].content;
    } catch (error) {
        console.error('Error generating summary:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default generateSummary;