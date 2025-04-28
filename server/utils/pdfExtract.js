import {PDFExtract} from 'pdf.js-extract';

/**
 * Function to extract text content from a PDF file.
 * @param {string} filePath - Path to the PDF file.
 * @returns {Promise<string>} - Resolves with extracted text as a single string.
 */
const pdfExtract = async (filePath) => {
    const pdf = new PDFExtract();
    const options = {}; // Add options if needed
    try {
        const data = await pdf.extract(filePath, options);
        const contentArray = data.pages.flatMap((page) =>
            page.content.map((item) => item.str.trim()).filter((text) => text !== '')
        );
        return contentArray.join(' ');
    } catch (error) {
        console.error('Error extracting PDF content:', error);
        throw error;
    }
};

export default pdfExtract;
