import { Select } from "./Select";
import { SelectItem } from "./SelectItem";

describe("Select", () => {
  it("should be able to move up or down selection", () => {
    const select = new Select([
      new SelectItem('1', 'opt 1', () => {}),
      new SelectItem('2', 'opt 2', () => {}),
      new SelectItem('3', 'opt 3', () => {}),
    ]);

    expect(select.get().label).toBe('opt 1');

    select.up();

    expect(select.get().label).toBe('opt 1');

    select.down();

    expect(select.get().label).toBe('opt 2');

    select.down();

    expect(select.get().label).toBe('opt 3');

    select.down();

    expect(select.get().label).toBe('opt 3');

    select.up();

    expect(select.get().label).toBe('opt 2');
  });
});
