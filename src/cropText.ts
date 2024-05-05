import { generateSpaces } from "./generateSpaces";

interface Options {
  text: string;
  moreSymbol: string;
  paddingLeft: number;
  width: number;
}

export function cropText({
  text,
  moreSymbol,
  paddingLeft,
  width,
}: Options): string {
  let line = text;

  // width:   x   (1 length)
  // padding: x x (2 length)
  // result:  x   (1 length)
  if (paddingLeft > width) {
    return generateSpaces(width);
  }

  line = generateSpaces(paddingLeft) + line;

  line = line.padEnd(width, " ");

  // width: a b c     (3 length)
  // line:  a b c d e (5 length)
  // result: 2
  const diffLineWidth = line.length - width;

  const isCrossingWidth = diffLineWidth > 0;

  if (isCrossingWidth) {
    const textMaxWidth = width - paddingLeft;

    // ... -> width = 1 -> .
    // ... -> width = 2 -> ..
    // ... -> width = 5 -> ...
    const currentMoreSymbol = moreSymbol.slice(0, textMaxWidth);

    // more symbol: ...  (3 length) -> adjusted symbol = .. (2 length)
    // width:  a b c     (3 length)
    // line:   a b c d e (5 length)
    // result: a b c . . (5 length)
    line = line.slice(0, width - currentMoreSymbol.length);

    return line + currentMoreSymbol;
  }

  return line;
}
