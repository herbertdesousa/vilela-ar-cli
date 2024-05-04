import prompts from "prompts";
import Readline from "readline";
import chalk from "chalk";

import { Select } from "./Select";

/* import * as argv from 'yargs';

prompts.override(argv);

(async () => {
  const response = await prompts({
    type: 'number',
    name: '',
    message: 'This message will be overridden',
  });

  console.log(response);
})();
 */

Readline.createInterface({
  input: process.stdin,
  terminal: true,
  historySize: 0,
});

process.stdin.setEncoding("utf8");

const select = new Select(["opt 1", "opt 2", "opt 3"]);

interface SelectPrintStyle {
  paddingLeft?: number;
  paddingRight?: number;
}

function generateSpaces(amount: number): string {
  return " ".repeat(amount);
}

class SelectDrawer {
  private style: Required<SelectPrintStyle>;

  constructor(private select: Select, style: SelectPrintStyle) {
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
        lines.push(chalk.bgGreenBright.black(line));
      } else {
        lines.push(line);
      }
    }

    return lines.join("\n");
  }
}

const selectPrinter = new SelectDrawer(select, {
  paddingLeft: 2,
  paddingRight: 5,
});

function render() {
  console.clear();

  console.log(selectPrinter.draw());
}

render();

process.stdin.on("keypress", (_, key) => {
  switch (key?.name) {
    case "up":
      select.up();
      break;
    case "down":
      select.down();
      break;
  }

  render();
});
