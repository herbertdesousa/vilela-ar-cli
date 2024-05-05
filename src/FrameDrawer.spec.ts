import { FrameDrawer } from "./FrameDrawer";

describe("FrameDrawer", () => {
  it("should be able to draw", () => {
    const frameDrawer1 = new FrameDrawer({
      title: "Titulo",
      width: 30,
      height: 5,
    });

    expect(frameDrawer1.draw(["Linha I", "Linha II", "Linha III"])).toEqual([
      "╔══ Titulo ══════════════════╗",
      "║ Linha I                    ║",
      "║ Linha II                   ║",
      "║ Linha III                  ║",
      "║                            ║",
      "║                            ║",
      "╚════════════════════════════╝"
    ]);

    const frameDrawer2 = new FrameDrawer({
      title: "Titulo 2",
      width: 25,
      height: 8,
    });

    expect(frameDrawer2.draw(["Linha I", "Linha II", "Linha III"])).toEqual([
      "╔══ Titulo 2 ═══════════╗",
      "║ Linha I               ║",
      "║ Linha II              ║",
      "║ Linha III             ║",
      "║                       ║",
      "║                       ║",
      "║                       ║",
      "║                       ║",
      "║                       ║",
      "╚═══════════════════════╝"
    ]);

    const frameDrawer3 = new FrameDrawer({
      title: "Titulo 2",
      width: 25,
      height: 3,
    });

    expect(frameDrawer3.draw(["Linha I", "Linha II", "Linha III"])).toEqual([
      "╔══ Titulo 2 ═══════════╗",
      "║ Linha I               ║",
      "║ Linha II              ║",
      "║ Linha III             ║",
      "╚═══════════════════════╝"
    ]);
  });
});
