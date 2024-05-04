type DrawerColor = "primary";

type DrawerComposeReq = {
  text: string;
  color: DrawerColor;
  applyIn: 'bg' | 'text';
};

type ComposeResolver = Record<
  DrawerComposeReq["color"],
  Record<DrawerComposeReq["applyIn"], (value: string) => string>
>;

/*
function helperChalk(fn: any) {
  const [left, right] = String(fn('hello')).split('hello');

  console.log({
    text: '(txt) => `' + left + '${txt}' + right + '`'
  })
}

helperChalk(chalk.blue)

console.log(new Drawer().compose({
  text: 'hello',
  color: 'primary',
  applyIn: 'text'
}))
*/

export class Drawer {
  compose(payload: DrawerComposeReq): string {
    const resolver: ComposeResolver = {
      primary: {
        bg: (txt) => `\x1B[44m${txt}\x1B[49m`,
        text: (txt) => `\x1B[34m${txt}\x1B[39m`,
      },
    }

    const resolve = resolver[payload.color][payload.applyIn]

    if (!resolve) return payload.text;

    return resolve(payload.text);
  }
}