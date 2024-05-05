import { Select } from "../components/Select";
import { SelectItem } from "../components/SelectItem";
import { SelectDrawer } from "./SelectDrawer";

describe("SelectDrawer", () => {
  it("should be able to draw simple", () => {
    const select = new Select([
      new SelectItem("1", "opt 1", () => {}),
      new SelectItem("2", "opt two", () => {}),
      new SelectItem("3", "opt 3", () => {}),
    ]);

    jest
      .spyOn(select, "get")
      .mockImplementationOnce(() => new SelectItem("1", "opt 1", () => {}));

    const selectPrinter = new SelectDrawer(select, {
      paddingLeft: 1,
      width: 10,
    });

    expect(selectPrinter.draw()).toEqual([
      " > opt 1  ",
      " opt two  ",
      " opt 3    ",
    ]);
  });
});
