import pdfExtract from '../utils/pdfExtract.js';
import generateSummary from '../utils/vertexAI.js';

/**
 * Controller function to process the PDF and generate summary using Vertex AI
 * @param {Object} req - The request object containing the file path.
 * @param {Object} res - The response object.
 */
const generateSummaryController = async (req, res) => {
    try {
        const filePath = req.file.path; 
        console.log('File Path:', filePath);

        const pdfContent = await pdfExtract(filePath);
        console.log('PDF Content Extracted:', pdfContent);

        const summary = await generateSummary(pdfContent);
        console.log('Generated Summary:', summary);

        res.status(200).json({
            message: 'Summary generated successfully',
            summary: summary,
        });
    } catch (error) {
        console.error('Error in generateSummaryController:', error);
        res.status(500).json({ error: 'Failed to generate summary' });
    }
};

export default generateSummaryController;
