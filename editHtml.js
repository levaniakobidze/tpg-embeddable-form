import fs from 'fs-extra'; 
import * as cheerio from 'cheerio';

// Paths
const htmlFilePath = './dist/index.html';
const oldScript = 'old_script.js';
const newScript = 'new_script.js';

async function updateHtmlScript() {
  try {
    // Check if the file exists
    if (!(await fs.pathExists(htmlFilePath))) {
      console.error(`File not found: ${htmlFilePath}`);
      return;
    }

    // Read the HTML file
    const htmlContent = await fs.readFile(htmlFilePath, 'utf-8');

    // Load HTML into Cheerio
    const $ = cheerio.load(htmlContent);

    // Find and update the script tag
    const scriptElement = $(`script[src="${oldScript}"]`);
    if (scriptElement.length > 0) {
      scriptElement.attr('src', newScript);
      console.log(`Updated script src from "${oldScript}" to "${newScript}".`);

      // Save the modified HTML back to the file
      await fs.writeFile(htmlFilePath, $.html(), 'utf-8');
      console.log('HTML file updated successfully.');
    } else {
      console.error(`Script element with src="${oldScript}" not found.`);
    }
  } catch (error) {
    console.error('Error updating HTML file:', error);
  }
}

// Run the function
updateHtmlScript();
