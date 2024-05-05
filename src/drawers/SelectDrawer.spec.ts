import { Select } from "../components/Select";
import { SelectDrawer } from "./SelectDrawer";

describe("SelectDrawer", () => {
  it("should be able to draw simple", () => {
    const select = new Select(["opt 1", "opt two", "opt 3"]);

    jest.spyOn(select, "get").mockImplementationOnce(() => "opt 1");

    const selectPrinter = new SelectDrawer(select, {
      paddingLeft: 1,
      width: 10,
    });

    expect(selectPrinter.draw()).toEqual([
      ' > opt 1  ',
      " opt two  ",
      " opt 3    ",
    ]);
  });
});
