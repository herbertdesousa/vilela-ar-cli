import { Select } from "./components/Select";

describe("Select", () => {
  it("should be able to move up or down selection", () => {
    const select = new Select(['opt 1', 'opt 2', 'opt 3']);

    expect(select.get()).toBe('opt 1');

    select.up();

    expect(select.get()).toBe('opt 1');

    select.down();

    expect(select.get()).toBe('opt 2');

    select.down();

    expect(select.get()).toBe('opt 3');

    select.down();

    expect(select.get()).toBe('opt 3');

    select.up();

    expect(select.get()).toBe('opt 2');
  });
});
