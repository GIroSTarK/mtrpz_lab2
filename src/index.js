import fs from 'fs/promises';
import path from 'path';
import {
  setHtmlTags,
  setAnsiSequences,
  formatMarkdown,
} from './parsers/parser.js';

const filePath = process.argv[2];
const outputFlag = process.argv.indexOf('--out');
const formatFlag = process.argv.indexOf('--format');
let format = 'noFormat';
if (formatFlag !== -1) {
  format = process.argv[formatFlag + 1];
}

if (!filePath) {
  throw new Error('No file path provided');
}

const md = await fs.readFile(filePath, 'utf-8');

const markdownToHTML = formatMarkdown(md, setHtmlTags, 'html');
const markdownToAnsi = formatMarkdown(md, setAnsiSequences, 'ansi');

const handleFormat = (
  converter = markdownToHTML,
  converter2 = markdownToAnsi
) => {
  if (outputFlag !== -1 && process.argv[outputFlag + 1]) {
    const outputPath = path.resolve(process.argv[outputFlag + 1]);
    fs.writeFile(outputPath, converter());
  } else {
    console.log(converter2());
  }
};

const formatFuncs = {
  html: handleFormat.bind(null, markdownToHTML, markdownToHTML),
  ansi: handleFormat.bind(null, markdownToAnsi, markdownToAnsi),
  noFormat: handleFormat,
};

formatFuncs[format]();
