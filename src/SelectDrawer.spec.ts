import { Drawer } from "./Drawer";
import { Select } from "./Select";
import { SelectDrawer } from "./SelectDrawer";

describe("SelectDrawer", () => {
  it("should be able to draw simple", () => {
    const select = new Select(["opt 1", "opt two", "opt 3"]);
    const drawer = new Drawer();

    jest.spyOn(select, "get").mockImplementationOnce(() => "opt 1");

    const selectPrinter = new SelectDrawer(select, drawer, {
      paddingLeft: 1,
      width: 10,
    });

    const selectedLine = drawer.compose({
      text: " opt 1    ",
      applyIn: "bg",
      color: "primary",
    });

    expect(selectPrinter.draw()).toEqual([
      selectedLine,
      " opt two  ",
      " opt 3    ",
    ]);
  });
});
