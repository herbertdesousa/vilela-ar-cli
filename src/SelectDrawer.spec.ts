import { Drawer } from "./Drawer";
import { Select } from "./Select";
import { SelectDrawer } from "./SelectDrawer";

describe("SelectDrawer", () => {
  it("should be able to draw correctly", () => {
    const select = new Select(["opt 1", "opt 2", "opt 3"]);
    const drawer = new Drawer();

    jest.spyOn(select, "get").mockImplementationOnce(() => "opt 1");

    const selectPrinter1 = new SelectDrawer(select, drawer, {
      paddingLeft: 1,
      paddingRight: 1,
    });

    drawer.compose({
      text: " opt 1 ",
      applyIn: 'bg',
      color: 'primary'
    });

    expect(selectPrinter1.draw()).toBe(
      drawer.compose({
        text: " opt 1 ",
        color: "primary",
        applyIn: "bg",
      }) + "\n opt 2 \n opt 3 "
    );

    //

    jest.spyOn(select, "get").mockImplementationOnce(() => "opt 1");

    const selectPrinter2 = new SelectDrawer(select, drawer);

    expect(selectPrinter2.draw()).toBe(
      drawer.compose({
        text: "opt 1",
        color: "primary",
        applyIn: "bg",
      }) + "\nopt 2\nopt 3",
    );
  });
});
