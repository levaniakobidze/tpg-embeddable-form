import fs from 'fs-extra';
import path from 'path';
import * as cheerio from 'cheerio';

const distDirectory = './dist';
const customFileName = 'tpg-form';

async function renameFiles() {
  try {
    const files = await fs.readdir(distDirectory);

    console.log(files, 'Files found in dist directory');

    let jsFile = null;
    let cssFile = null;

    for (const file of files) {
      const ext = path.extname(file);
      if (ext === '.js') {
        jsFile = file;
        let newJsName;

        // Define new file names based on specific conditions
        console.log(file,'filey');
        
        if (file === 'orderForm.js') {
          newJsName = `order-form.js`;
        } else if (file === 'twoStepOrderForm.js') {
          newJsName = `two-step-order-form.js`;
        } else if (file === 'script.js') {
          newJsName = `${customFileName}.js`;
        } else {
          console.warn(`No renaming rule for file: ${file}`);
          continue; // Skip files that don't match any rule
        }

        await fs.rename(
          path.join(distDirectory, file),
          path.join(distDirectory, newJsName)
        );
        console.log(`Renamed ${file} to ${newJsName}`);
      } else if (ext === '.css') {
        cssFile = file;
        // const newCssName = `${customFileName}.css`;
            console.log(file,'ffff');
          let newCssName;  
          
        if (file === 'orderFormStyles.css') {
            newCssName = `order-form.css`;
          } else if (file === 'twoStepOrderFormStyles.css') {
            newCssName = `two-step-order-form.css`;
          } else if (file === 'style.css') {
            newCssName = `${customFileName}.css`;
          } else {
            console.warn(`No renaming rule for file: ${file}`);
            continue; // Skip files that don't match any rule
          }
        await fs.rename(
          path.join(distDirectory, file),
          path.join(distDirectory, newCssName)
        );
        console.log(`Renamed ${file} to ${newCssName}`);
      }
    }

    if (!jsFile && !cssFile) {
      console.log('No JS or CSS files found to rename.');
      return;
    }

    const indexPath = path.join(distDirectory, 'index.html');
    if (await fs.pathExists(indexPath)) {
      const htmlContent = await fs.readFile(indexPath, 'utf-8');
      const $ = cheerio.load(htmlContent);

      if (jsFile) {
        $('script[src]').each((_, el) => {
          if ($(el).attr('src').includes(jsFile)) {
            $(el).attr('src', `/${customFileName}.js`);
            console.log(`Updated script tag to /${customFileName}.js`);
          }
        });
      }

      if (cssFile) {
        $('link[rel="stylesheet"]').each((_, el) => {
          if ($(el).attr('href').includes(cssFile)) {
            $(el).attr('href', `/${customFileName}.css`);
            console.log(`Updated link tag to /${customFileName}.css`);
          }
        });
      }

      await fs.writeFile(indexPath, $.html(), 'utf-8');
      console.log('Updated index.html with new file names.');
    } else {
      console.error('index.html not found in the dist directory.');
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

renameFiles();
