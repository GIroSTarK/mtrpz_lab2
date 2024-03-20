import {
  isMarkerClosedChecker,
  nestedMarkersChecker,
} from '../errorHandlers/errorHandlers.js';

export const markers = ['**', '_', '`'];

const boldRegex =
  /(?<=[ ,.:;\n\t]|^)\*\*(?=\S)(.+?)(?<=\S)\*\*(?=[ ,.:;\n\t]|$)/g;
const italicRegex = /(?<=[ ,.:;\n\t]|^)_(?=\S)(.+?)(?<=\S)_(?=[ ,.:;\n\t]|$)/g;
const monospacedRegex =
  /(?<=[ ,.:;\n\t]|^)`(?=\S)(.+?)(?=\S)`(?=[ ,.:;\n\t]|$)/g;
const regexps = [boldRegex, italicRegex, monospacedRegex];

const leftBold = /(?<=[ ,.:;\n\t]|^)\*\*(?=\S)/g;
const rightBold = /(?<=\S)\*\*(?=[ ,.:;\n\t]|$)/g;
const leftItalic = /(?<=[ ,.:;\n\t]|^)_(?=\S)/g;
const rightItalic = /(?<=\S)_(?=[ ,.:;\n\t]|$)/g;
const leftMonospaced = /(?<=[ ,.:;\n\t]|^)`(?=\S)/g;
const rightMonospaced = /(?=\S)`(?=[ ,.:;\n\t]|$)/g;

export const setParagraphs = (text, format) => {
  const paragraphs = text
    .split('\n\n')
    .filter((par) => par.trim() !== '')
    .map((par) => {
      if (format === 'html') {
        return `<p>${par.trim()}</p>\n`;
      } else {
        return par.trim() + '\n';
      }
    });

  return paragraphs.join('');
};

export const setPreformattedParts = (text, format) => {
  if (!text.startsWith('\n')) {
    throw new Error('Should be line break after preformatted marker');
  }
  if (!text.endsWith('\n')) {
    throw new Error('Should be line break before last preformatted marker');
  }

  if (format === 'html') {
    return `<pre>${text}</pre>\n`;
  } else {
    return text.trim() + '\n';
  }
};

export const setHtmlTags = (text) => {
  return text
    .replace(boldRegex, '<b>$1</b>')
    .replace(italicRegex, '<i>$1</i>')
    .replace(monospacedRegex, '<tt>$1</tt>');
};

export const setAnsiSequences = (text) => {
  return text
    .replace(boldRegex, '\x1b[1m$1\x1b[0m')
    .replace(italicRegex, '\x1b[3m$1\x1b[0m')
    .replace(monospacedRegex, '\x1b[7m$1\x1b[0m');
};

export const formatMarkdown = (md, setFormat, format) => {
  return () => {
    const parts = md.split('```');
    if (parts.length % 2 === 0) {
      throw new Error('No closing preformatted marker provided');
    }

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        isMarkerClosedChecker(parts[i], leftBold, rightBold, boldRegex);
        isMarkerClosedChecker(parts[i], leftItalic, rightItalic, italicRegex);
        isMarkerClosedChecker(
          parts[i],
          leftMonospaced,
          rightMonospaced,
          monospacedRegex
        );
        regexps.forEach((regex, index) =>
          nestedMarkersChecker(parts[i], regex, markers[index])
        );
        parts[i] = setFormat(parts[i]);
        parts[i] = setParagraphs(parts[i], format);
      } else {
        parts[i] = setPreformattedParts(parts[i], format);
      }
    }

    return parts.join('');
  };
};
