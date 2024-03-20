import fs from 'fs/promises';
import {
  setParagraphs,
  setPreformattedParts,
  setHtmlTags,
  setAnsiSequences,
  formatMarkdown,
} from './parser.js';

describe('Set paragraphs', () => {
  it('should correctly set paragraphs without formatting', () => {
    const text = 'Hello\n\nworld!\n\n';
    expect(setParagraphs(text)).toBe('Hello\nworld!\n');
  });
  it('should correctly set paragraphs in html format', () => {
    const text = 'Hello\n\nworld!\n\n';
    expect(setParagraphs(text, 'html')).toBe('<p>Hello</p>\n<p>world!</p>\n');
  });
});

describe('Set preformatted parts', () => {
  it('should correctly set preformatted parts in ansi format', () => {
    const text = '\nHello world!\n';
    const result = setPreformattedParts(text, 'ansi');
    expect(result).toBe('Hello world!\n');
  });
  it('should correctly set preformatted parts in html format', () => {
    const text = '\nHello world!\n';
    const result = setPreformattedParts(text, 'html');
    expect(result).toBe('<pre>\nHello world!\n</pre>\n');
  });
  it('should throw an error when there are some other symbols after first marker', () => {
    const text = 'Hello world!\n';
    expect(() => setPreformattedParts(text)).toThrow(
      'Should be line break after preformatted marker'
    );
  });
  it('should throw an error when there are some other symbols before last marker', () => {
    const text = '\nHello world!';
    expect(() => setPreformattedParts(text)).toThrow(
      'Should be line break before last preformatted marker'
    );
  });
});

describe('Set html tags', () => {
  it('should correctly set <b> tags', () => {
    const text = '**Hello** world!';
    expect(setHtmlTags(text)).toBe('<b>Hello</b> world!');
  });
  it('should correctly set <i> tags', () => {
    const text = 'Hello _world!_';
    expect(setHtmlTags(text)).toBe('Hello <i>world!</i>');
  });
  it('should correctly set <tt> tags', () => {
    const text = 'Hello `world!`';
    expect(setHtmlTags(text)).toBe('Hello <tt>world!</tt>');
  });
  it('should correctly set <b>, <i> and <tt> tags', () => {
    const text = '**Hello**, my _name_ is `Illya!`';
    expect(setHtmlTags(text)).toBe(
      '<b>Hello</b>, my <i>name</i> is <tt>Illya!</tt>'
    );
  });
});

describe('Set ansi sequences', () => {
  it('should correctly set bold sequency', () => {
    const text = '**Hello** world!';
    expect(setAnsiSequences(text)).toBe('\x1b[1mHello\x1b[0m world!');
  });
  it('should correctly set cursive sequency', () => {
    const text = 'Hello _world!_';
    expect(setAnsiSequences(text)).toBe('Hello \x1b[3mworld!\x1b[0m');
  });
  it('should correctly set inverted sequency', () => {
    const text = 'Hello `world!`';
    expect(setAnsiSequences(text)).toBe('Hello \x1b[7mworld!\x1b[0m');
  });
  it('should correctly set all sequences', () => {
    const text = '**Hello**, my _name_ is `Illya!`';
    expect(setAnsiSequences(text)).toBe(
      '\x1b[1mHello\x1b[0m, my \x1b[3mname\x1b[0m is \x1b[7mIllya!\x1b[0m'
    );
  });
});

describe('Format markdown', () => {
  it('should correctly format markdown to html', async () => {
    const md = await fs.readFile('example.md', 'utf8');
    const markdownToHTML = formatMarkdown(md, setHtmlTags, 'html');
    expect(markdownToHTML()).toBe(
      '<p>Nestled in the <i>heart</i> of Italy, <b>Ancient Rome</b> stands as a <tt>testament</tt> to the marvels of human civilization.</p>\n<pre>\nWith its rich `history spanning` over a _millen_nium_, Rome has left an inde_lible mark on the world, influencing art, architecture, politics, and culture for centuries to come.\n</pre>\n'
    );
  });
  it('should correctly format markdown to ansi', async () => {
    const md = await fs.readFile('example.md', 'utf8');
    const markdownToAnsi = formatMarkdown(md, setAnsiSequences, 'ansi');
    expect(markdownToAnsi()).toBe(
      'Nestled in the \x1b[3mheart\x1b[0m of Italy, \x1b[1mAncient Rome\x1b[0m stands as a \x1b[7mtestament\x1b[0m to the marvels of human civilization.\nWith its rich `history spanning` over a _millen_nium_, Rome has left an inde_lible mark on the world, influencing art, architecture, politics, and culture for centuries to come.\n'
    );
  });
  it('should throw an error when there is no closing preformatted marker', () => {
    const text = '```\nHello world!';
    const markdownToHTML = formatMarkdown(text, setHtmlTags, 'html');
    expect(() => markdownToHTML()).toThrow('No closing preformatted marker provided');
  });
});
