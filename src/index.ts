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
