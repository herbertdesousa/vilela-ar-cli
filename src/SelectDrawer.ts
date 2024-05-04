import chalk from "chalk";
import { generateSpaces } from "./generateSpaces";

import { Select } from "./Select";
import { Drawer } from "./Drawer";

interface SelectPrintStyle {
  paddingLeft?: number;
  paddingRight?: number;
}

export class SelectDrawer {
  private style: Required<SelectPrintStyle>;

  constructor(
    private select: Select,
    private drawer: Drawer,
    style: SelectPrintStyle = {}
  ) {
    this.style = { paddingLeft: 0, paddingRight: 0, ...style };
  }

  draw(): string {
    const selectedOption = this.select.get();
    const leftSpaces = generateSpaces(this.style.paddingLeft);
    const rightSpaces = generateSpaces(this.style.paddingRight);

    const lines: string[] = [];

    for (const option of this.select.all()) {
      const line = `${leftSpaces}${option}${rightSpaces}`;

      if (option === selectedOption) {
        lines.push(
          this.drawer.compose({
            text: line,
            color: "primary",
            applyIn: "bg",
          })
        );
      } else {
        lines.push(line);
      }
    }

    return lines.join("\n");
  }
}
