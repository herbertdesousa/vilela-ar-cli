import { SelectItem } from "./SelectItem";

export class Select {
  private optionIndex = 0;

  constructor(private options: SelectItem[]) {
    if (options.length === 0) throw new Error("Options Empty");
  }

  all(): SelectItem[] {
    return this.options;
  }

  get(): SelectItem {
    return this.options[this.optionIndex];
  }

  up(): void {
    const nextOptionIndex = this.optionIndex - 1;
    const optionAbove = this.options[nextOptionIndex];

    if (!optionAbove) return;

    this.optionIndex = nextOptionIndex;
  }

  down(): void {
    const previousOptionIndex = this.optionIndex + 1;
    const optionBelow = this.options[previousOptionIndex];

    if (!optionBelow) return;

    this.optionIndex = previousOptionIndex;
  }
}