import Readline from "readline";

import { FrameDrawer } from "./FrameDrawer";
import { Select } from "./Select";
import { SelectDrawer } from "./SelectDrawer";

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

const select = new Select([
  "Tipo: Recibo",
  "Data: 00/00/0000",
  "Endereço: Rua Carlos Alberto Luiz - Vila Medeiros - São Paulo - SP",
  "CNPJ: 00.000.000/0001-00",
]);

const headerFrame = new FrameDrawer({
  width: 35,
  height: 10,
  title: "Cabeçalho",
});

const selectPrinter = new SelectDrawer(select, {
  paddingLeft: 1,
  width: 30,
});

function render() {
  console.clear();

  headerFrame.draw(selectPrinter.draw()).forEach(row => {
    console.log(row);
  })
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
