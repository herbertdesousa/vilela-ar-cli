import prompts from "prompts";
import Readline from "readline";
import chalk from "chalk";

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

class Select {
  private optionIndex = 0;

  constructor(private options: string[]) {
    if (options.length === 0) throw new Error("Options Empty");
  }

  all(): string[] {
    return this.options;
  }

  get() {
    return this.options[this.optionIndex];
  }

  up() {
    const nextOptionIndex = this.optionIndex - 1;
    const optionAbove = this.options[nextOptionIndex];

    if (!optionAbove) return;

    this.optionIndex = nextOptionIndex;
  }

  down() {
    const previousOptionIndex = this.optionIndex + 1;
    const optionBelow = this.options[previousOptionIndex];

    if (!optionBelow) return;

    this.optionIndex = previousOptionIndex;
  }
}

const select = new Select(["opt 1", "opt 2", "opt 3"]);
/* console.log(select.get()); // opt 1
select.up();
console.log(select.get()); // opt 1
select.down();
console.log(select.get()); // opt 2
select.down();
console.log(select.get()); // opt 3
select.down();
console.log(select.get()); // opt 3
select.up();
console.log(select.get()); // opt 2 */

function render() {
  console.clear();
  
  const selectedOption = select.get();

  for (const option of select.all()) {
    if (option === selectedOption) {
      console.log(chalk.bgBlue(`    ${option}    `));
    } else {
      console.log(`    ${option}    `);
    }
  }
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
