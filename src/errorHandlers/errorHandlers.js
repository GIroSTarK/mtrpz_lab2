import { markers } from '../parsers/parser.js';

export const isMarkerClosedChecker = (text, leftRegex, rightRegex, regex) => {
  const matchedMarkers = text.match(regex);
  const matchedLeftMarkers = text.match(leftRegex);
  const matchedRightMarkers = text.match(rightRegex);

  const markersLength = matchedMarkers ? matchedMarkers.length * 2 : 0;
  const leftMarkersLength = matchedLeftMarkers ? matchedLeftMarkers.length : 0;
  const rightMarkersLength = matchedRightMarkers
    ? matchedRightMarkers.length
    : 0;

  if (leftMarkersLength + rightMarkersLength !== markersLength) {
    throw new Error('There is no closing marker');
  }
};

export const nestedMarkersChecker = (text, regex, marker) => {
  const parts = text.match(regex);
  if (parts) {
    for (const part of parts) {
      const slicedPart = part.slice(marker.length, -marker.length);
      if (
        slicedPart.length > 2 &&
        (markers.includes(slicedPart[0] + slicedPart[1]) ||
          markers.includes(
            slicedPart[slicedPart.length - 1] +
              slicedPart[slicedPart.length - 2]
          ))
      ) {
        throw new Error('Nested markers are not allowed');
      }
      if (
        slicedPart.length > 1 &&
        (markers.includes(slicedPart[0]) ||
          markers.includes(slicedPart[slicedPart.length - 1]))
      ) {
        throw new Error('Nested markers are not allowed');
      }
      if (
        slicedPart.match(/\*\*/g)?.length > 1 ||
        slicedPart.match(/_/g)?.length > 1 ||
        slicedPart.match(/`/g)?.length > 1
      ) {
        throw new Error('Nested markers are not allowed');
      }
    }
  }
};
