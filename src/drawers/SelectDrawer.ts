import { Select } from "../components/Select";
import { cropText } from "../utils/cropText";

interface SelectPrintStyle {
  paddingLeft?: number;
  width: number;
}

export class SelectDrawer {
  private style: Required<SelectPrintStyle>;

  private moreSymbol = "...";

  constructor(
    private select: Select,
    style: SelectPrintStyle
  ) {
    this.style = { paddingLeft: 0, ...style };
  }

  draw(): string[] {
    const selectedOption = this.select.get();

    const lines = this.select.all().map((option) => {
      const isSelected = option === selectedOption;

      return cropText({
        text: isSelected ? `> ${option}` : option,
        moreSymbol: this.moreSymbol,
        paddingLeft: this.style.paddingLeft,
        width: this.style.width,
      });
    });

    return lines;
  }
}
