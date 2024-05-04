import { Drawer } from "./Drawer";
import { Select } from "./Select";
import { SelectDrawer } from "./SelectDrawer";

describe("cropText", () => {
  it("should be able to draw simple", () => {
    const select = new Select(["opt 1", "opt 2", "opt 3"]);
    const drawer = new Drawer();

    jest.spyOn(select, "get").mockImplementationOnce(() => "opt 1");

    const selectPrinter = new SelectDrawer(select, drawer, {
      paddingLeft: 1,
      paddingRight: 1,
      width: 10,
    });

    const selectedLine = drawer.compose({
      text: " opt 1    ",
      applyIn: "bg",
      color: "primary",
    });

    expect(selectPrinter.draw()).toEqual([
      selectedLine,
      " opt 2    ",
      " opt 3    ",
    ]);
  });

  it("should be able to fit different text widths", () => {
    const select = new Select(["opt 1", "opt prime", "opt 3"]);
    const drawer = new Drawer();

    jest.spyOn(select, "get").mockImplementationOnce(() => "opt 1");

    const selectPrinter = new SelectDrawer(select, drawer, {
      paddingLeft: 1,
      paddingRight: 1,
      width: 10,
    });

    const selectedLine = drawer.compose({
      text: " opt 1    ",
      applyIn: "bg",
      color: "primary",
    });

    expect(selectPrinter.draw()).toEqual([
      selectedLine,
      " opt prime",
      " opt 3    ",
    ]);
  });

  it("should be able to crop if width is too small", () => {
    const select = new Select(["opt 1", "opt prime", "opt 3"]);
    const drawer = new Drawer();

    jest.spyOn(select, "get").mockImplementation(() => "opt 1");

    const selectPrinter1 = new SelectDrawer(select, drawer, { width: 5 });

    const selectedLine1 = drawer.compose({
      text: "opt 1",
      applyIn: "bg",
      color: "primary",
    });

    expect(selectPrinter1.draw()).toEqual([selectedLine1, "op...", "opt 3"]);

    //

    const selectPrinter2 = new SelectDrawer(select, drawer, {
      paddingLeft: 2,
      paddingRight: 2,
      width: 5,
    });

    const selectedLine2 = drawer.compose({
      text: "  ...",
      applyIn: "bg",
      color: "primary",
    });

    expect(selectPrinter2.draw()).toEqual([selectedLine2, "  ...", "  ..."]);

    //

    const selectPrinter3 = new SelectDrawer(select, drawer, {
      paddingLeft: 2,
      paddingRight: 2,
      width: 3,
    });

    const selectedLine3 = drawer.compose({
      text: "  .",
      applyIn: "bg",
      color: "primary",
    });

    expect(selectPrinter3.draw()).toEqual([selectedLine3, "  .", "  ."]);

    //

    const selectPrinter4 = new SelectDrawer(select, drawer, {
      paddingLeft: 2,
      paddingRight: 2,
      width: 2,
    });

    const selectedLine4 = drawer.compose({
      text: "  ",
      applyIn: "bg",
      color: "primary",
    });

    expect(selectPrinter4.draw()).toEqual([selectedLine4, "  ", "  "]);

    //

    const selectPrinter5 = new SelectDrawer(select, drawer, {
      paddingLeft: 2,
      paddingRight: 2,
      width: 1,
    });

    const selectedLine5 = drawer.compose({
      text: " ",
      applyIn: "bg",
      color: "primary",
    });

    expect(selectPrinter5.draw()).toEqual([selectedLine5, " ", " "]);
  });

  /* it('should be able to draw with same padding end with different widths', () => {
    const select = new Select(["opt 1", "opt prime", "opt"]);
    const drawer = new Drawer();

    jest.spyOn(select, "get").mockImplementationOnce(() => "opt 1");

    const selectPrinter2 = new SelectDrawer(select, drawer, {
      paddingRight: 5,
    });

    "opt 1         "
    "opt prime     "

    expect(selectPrinter2.draw()).toBe(
      drawer.compose({
        text: "opt 1     ",
        color: "primary",
        applyIn: "bg",
      }) + "\nopt prime     \nopt 3",
    );
  }); */
});
