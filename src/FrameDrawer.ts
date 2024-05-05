interface FrameDrawerOptions {
  title: string;
  width: number;
  height: number;
}

export class FrameDrawer {
  constructor(private options: FrameDrawerOptions) {}

  draw(content: string[]): string[] {
    const rightTopConer = "═╗";
    let topRow = "╔══ " + this.options.title + " ";
    topRow = topRow.padEnd(this.options.width - rightTopConer.length, "═");
    topRow += rightTopConer;

    const leftColumn = "║ ";
    const rightColumn = " ║";

    const body = content.map((contentRow) => {
      let row = leftColumn + contentRow;
      row = row.padEnd(this.options.width - rightColumn.length, " ");
      row += rightColumn;

      return row;
    });

    const restColumnsLength = this.options.height - content.length;

    const restColumns = Array(restColumnsLength)
      .fill("")
      .map(() => {
        let row = leftColumn;
        row = row.padEnd(this.options.width - rightColumn.length, " ");
        row += rightColumn;

        return row;
      });

    const rightBottomCorner = "╝";
    let bottomRow = "╚";
    bottomRow = bottomRow.padEnd(
      this.options.width - rightBottomCorner.length,
      "═"
    );
    bottomRow += rightBottomCorner;

    return [topRow, ...body, ...restColumns, bottomRow];
  }
}
