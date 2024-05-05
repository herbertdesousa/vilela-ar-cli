import { Drawer } from "./Drawer";
import { Select } from "./Select";
import { cropText } from "./cropText";

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
      const line = cropText({
        text: option,
        moreSymbol: this.moreSymbol,
        paddingLeft: this.style.paddingLeft,
        paddingRight: this.style.paddingRight,
        width: this.style.width,
      });

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
