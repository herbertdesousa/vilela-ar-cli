import chalk from "chalk";
import { generateSpaces } from "./generateSpaces";

import { Select } from "./Select";
import { Drawer } from "./Drawer";

interface SelectPrintStyle {
  paddingLeft?: number;
  paddingRight?: number;
  width: number;
}

export class SelectDrawer {
  private style: Required<SelectPrintStyle>;

  private moreSymbol = "...";

  constructor(
    private select: Select,
    private drawer: Drawer,
    style: SelectPrintStyle
  ) {
    this.style = { paddingLeft: 0, paddingRight: 0, ...style };
  }

  draw(): string[] {
    const selectedOption = this.select.get();

    const lines = this.select.all().map((option) => {
      let line = option;

      // width:   x   (1 length)
      // padding: x x (2 length)
      // result:  x   (1 length)
      if (this.style.paddingLeft > this.style.width) {
        return generateSpaces(this.style.width);
      }

      line = generateSpaces(this.style.paddingLeft) + line;

      line = line.padEnd(this.style.width, " ");

      // width: a b c X X (3 length)
      // line:  a b c d e (5 length)
      // result: 2
      const diffLineWidth = line.length - this.style.width;

      const isCrossingWidth = diffLineWidth > 0;

      if (isCrossingWidth) {
        const moreSymbolMaxWidth = this.style.width - this.style.paddingLeft;

        // ... -> width = 1 -> .
        // ... -> width = 2 -> ..
        // ... -> width = 5 -> ...
        const currentMoreSymbol = this.moreSymbol.slice(0, moreSymbolMaxWidth);

        // more symbol: ...  (3 length) -> adjusted symbol = .. (2 length)
        // width:  a b c     (3 length)
        // line:   a b c d e (5 length)
        // result: a b c . . (5 length)
        line = line.slice(0, this.style.width - currentMoreSymbol.length);

        line += currentMoreSymbol;
      }

      if (option === selectedOption) {
        return this.drawer.compose({
          text: line,
          color: "primary",
          applyIn: "bg",
        });
      }

      return line;
    });

    return lines;
  }
}
