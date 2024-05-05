import { cropText } from "./cropText";

describe("cropText", () => {
  it("should be able to crop in simple case", () => {
    const croppedText = cropText({
      text: "opt 1",
      moreSymbol: "...",
      paddingLeft: 1,
      paddingRight: 1,
      width: 10,
    });

    expect(croppedText).toBe(" opt 1    ");
  });

  it("should be able to fit different text widths", () => {
    const croppedText = cropText({
      text: "opt prime",
      moreSymbol: "...",
      paddingLeft: 1,
      paddingRight: 1,
      width: 10,
    });

    expect(croppedText).toBe(" opt prime");
  });

  it("should be able to crop if width is too small", () => {
    const croppedText1 = cropText({
      text: "opt prime",
      moreSymbol: "...",
      paddingLeft: 0,
      paddingRight: 0,
      width: 5,
    });

    expect(croppedText1).toBe("op...");

    //

    const croppedText2 = cropText({
      text: "opt prime",
      moreSymbol: "...",
      paddingLeft: 2,
      paddingRight: 2,
      width: 5,
    });

    expect(croppedText2).toBe("  ...");

    //

    const croppedText3 = cropText({
      text: "opt prime",
      moreSymbol: "...",
      paddingLeft: 2,
      paddingRight: 2,
      width: 3,
    });

    expect(croppedText3).toBe("  .");

    //

    const croppedText4 = cropText({
      text: "opt prime",
      moreSymbol: "...",
      paddingLeft: 2,
      paddingRight: 2,
      width: 2,
    });

    expect(croppedText4).toBe("  ");

    //

    const croppedText5 = cropText({
      text: " ",
      moreSymbol: "...",
      paddingLeft: 2,
      paddingRight: 2,
      width: 1,
    });

    expect(croppedText5).toBe(" ");
  });
});
