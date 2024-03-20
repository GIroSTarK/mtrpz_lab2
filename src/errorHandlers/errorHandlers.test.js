import {
  nestedMarkersChecker,
  isMarkerClosedChecker,
} from './errorHandlers.js';
import { markers, mainRegexps, sideRegexps } from '../parsers/parser.js';

describe('Check for nested markers', () => {
  it('should throw an error when there are markers inside similar to outside markers', () => {
    const text = '__Hello__ world!';
    expect(() => {
      nestedMarkersChecker(text, mainRegexps[0], markers[0]);
      nestedMarkersChecker(text, mainRegexps[1], markers[1]);
      nestedMarkersChecker(text, mainRegexps[2], markers[2]);
    }).toThrow('Nested markers are not allowed');
  });
  it('should throw an error when there are markers inside different from outside markers', () => {
    const text = '_**Hello**_ world!';
    expect(() => {
      nestedMarkersChecker(text, mainRegexps[0], markers[0]);
      nestedMarkersChecker(text, mainRegexps[1], markers[1]);
      nestedMarkersChecker(text, mainRegexps[2], markers[2]);
    }).toThrow('Nested markers are not allowed');
  });
  it('should throw an error when there are many nested markers inside', () => {
    const text = '**`_`**Hello**`_`** world!';
    expect(() => {
      nestedMarkersChecker(text, mainRegexps[0], markers[0]);
      nestedMarkersChecker(text, mainRegexps[1], markers[1]);
      nestedMarkersChecker(text, mainRegexps[2], markers[2]);
    }).toThrow('Nested markers are not allowed');
  });
  it('should throw an error when there are nested markers inside the text', () => {
    const text = '**He**ll**o** world!';
    expect(() => {
      nestedMarkersChecker(text, mainRegexps[0], markers[0]);
      nestedMarkersChecker(text, mainRegexps[1], markers[1]);
      nestedMarkersChecker(text, mainRegexps[2], markers[2]);
    }).toThrow('Nested markers are not allowed');
  });
  it('should return undefined when there are no nested markers', () => {
    const text = '_Hello_ world!';
    expect(
      nestedMarkersChecker(text, mainRegexps[0], markers[0])
    ).toBeUndefined();
    expect(
      nestedMarkersChecker(text, mainRegexps[1], markers[1])
    ).toBeUndefined();
    expect(
      nestedMarkersChecker(text, mainRegexps[2], markers[2])
    ).toBeUndefined();
  });
});

describe('Check for not closed markers', () => {
  const [leftBold, rightBold] = sideRegexps[0];
  const [leftItalic, rightItalic] = sideRegexps[1];
  const [leftMonospaced, rightMonospaced] = sideRegexps[2];

  it('should throw an error when one marker not closed', () => {
    const text = '_Hello!';

    expect(() => {
      isMarkerClosedChecker(text, leftBold, rightBold, mainRegexps[0]);
      isMarkerClosedChecker(text, leftItalic, rightItalic, mainRegexps[1]);
      isMarkerClosedChecker(
        text,
        leftMonospaced,
        rightMonospaced,
        mainRegexps[2]
      );
    }).toThrow('There is no closing marker');
  });
  it('should throw an error when two markers are not closed', () => {
    const text = '_**Hello!';
    expect(() => {
      isMarkerClosedChecker(text, leftBold, rightBold, mainRegexps[0]);
      isMarkerClosedChecker(text, leftItalic, rightItalic, mainRegexps[1]);
      isMarkerClosedChecker(
        text,
        leftMonospaced,
        rightMonospaced,
        mainRegexps[2]
      );
    }).toThrow('There is no closing marker');
  });
  it('should throw an error when two markers closed and one not closed', () => {
    const text = '_**Hello!**';
    expect(() => {
      isMarkerClosedChecker(text, leftBold, rightBold, mainRegexps[0]);
      isMarkerClosedChecker(text, leftItalic, rightItalic, mainRegexps[1]);
      isMarkerClosedChecker(
        text,
        leftMonospaced,
        rightMonospaced,
        mainRegexps[2]
      );
    }).toThrow('There is no closing marker');
  });
  it('should throw an error when one marker not opened', () => {
    const text = 'Hello!_';
    expect(() => {
      isMarkerClosedChecker(text, leftBold, rightBold, mainRegexps[0]);
      isMarkerClosedChecker(text, leftItalic, rightItalic, mainRegexps[1]);
      isMarkerClosedChecker(
        text,
        leftMonospaced,
        rightMonospaced,
        mainRegexps[2]
      );
    }).toThrow('There is no closing marker');
  });
  it('should throw an error when one marker opened and not closed for long text', () => {
    const text = "_Hello world! I'm Luntik!";
    expect(() => {
      isMarkerClosedChecker(text, leftBold, rightBold, mainRegexps[0]);
      isMarkerClosedChecker(text, leftItalic, rightItalic, mainRegexps[1]);
      isMarkerClosedChecker(
        text,
        leftMonospaced,
        rightMonospaced,
        mainRegexps[2]
      );
    }).toThrow('There is no closing marker');
  });
  it('should throw an error when one marker opened and not closed for long text with spaces', () => {
    const text = "_Hello     world!     I'm       Lun  tik!";
    expect(() => {
      isMarkerClosedChecker(text, leftBold, rightBold, mainRegexps[0]);
      isMarkerClosedChecker(text, leftItalic, rightItalic, mainRegexps[1]);
      isMarkerClosedChecker(
        text,
        leftMonospaced,
        rightMonospaced,
        mainRegexps[2]
      );
    }).toThrow('There is no closing marker');
  });
});
