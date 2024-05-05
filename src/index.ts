import prompts from "prompts";
import Readline from "readline";

import { Select } from "./Select";
import { SelectDrawer } from "./SelectDrawer";
import { Drawer } from "./Drawer";

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
const drawer = new Drawer();

const selectPrinter = new SelectDrawer(select, drawer, {
  paddingLeft: 1,
  width: 25,
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
