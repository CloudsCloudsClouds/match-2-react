// Why. Why. WHY HAVE IT ALL IN ONE SINGLE FILE.
// I had many many problems creating what pixi calls, a "custom component"
// That was the number 1 time sink. But thecnically a custom component was just a class that I could use later.
// Very useful for a card component let's say.
// So far this works. Shamelessly done with the help of AI, but not vibe coded. Coded mainly by me, Daniel B.
// I had fun. I was forced to learn and use a ton of react. I learnt that I don't like react but I respect it's power.

import { useEffect, useRef } from "react";
import { Application, Assets, Graphics, Sprite } from "pixi.js";
//import react from "./assets/react.svg";
import sprite_0 from "./assets/sprite-0.svg";
import sprite_1 from "./assets/sprite-1.svg";
import sprite_2 from "./assets/sprite-2.svg";
import sprite_3 from "./assets/sprite-3.svg";

export default function Match2Game() {
  const ref = useRef(null);

  useEffect(() => {
    const app = new Application();

    let isMounted = true;

    const run = async () => {
      await app.init({
        width: 400,
        height: 400,
        backgroundColor: 0x202020,
      });

      if (!isMounted) return; // Component was unmounted before init finished

      if (ref.current) {
        ref.current.appendChild(app.canvas);
      }

      // Not needed anymore, but still here by chance
      //const reactTexture = await Assets.load(react);
      const sprite0Texture = await Assets.load(sprite_0);
      const sprite1Texture = await Assets.load(sprite_1);
      const sprite2Texture = await Assets.load(sprite_2);
      const sprite3Texture = await Assets.load(sprite_3);

      // In theory it's possible to add more matches automagically
      // Just add more size, change the app size, add more colors, and sprites, and doneso
      // Still, not tested
      const size = 4;
      const tileSize = 90;
      const colors = [0xff5555, 0x55ff55, 0x5555ff, 0xffff55];
      const pairs = [...colors, ...colors];
      pairs.sort(() => Math.random() - 0.5);

      let first = null;
      let canClick = true;

      pairs.forEach((actualColor, i) => {
        const g = new Graphics();
        g.rect(0, 0, tileSize, tileSize).fill(0x808080); // Obfuscate with gray
        g.x = (i % size) * (tileSize + 10);
        g.y = Math.floor(i / size) * (tileSize + 10);
        g.eventMode = "static";
        g.actualColor = actualColor; // Store the actual color
        g.matched = false; // Initialize matched state

        //const squareSprite = new Sprite(reactTexture);
        // Make it depend on the color, if color 1 then sprite 1, and so on
        const spriteIndex = colors.indexOf(actualColor);
        const spriteTexture = [
          sprite0Texture,
          sprite1Texture,
          sprite2Texture,
          sprite3Texture,
        ][spriteIndex];
        // There has to be a better way...
        const squareSprite = new Sprite(spriteTexture);
        squareSprite.anchor.set(0.5);
        squareSprite.x = tileSize / 2;
        squareSprite.y = tileSize / 2;
        squareSprite.visible = false; // Obfuscate the sprite
        g.addChild(squareSprite);

        g.on("pointerdown", () => {
          if (!canClick || g === first || g.matched) {
            return;
          }

          // Reveal the current card
          g.clear().rect(0, 0, tileSize, tileSize).fill(g.actualColor);
          g.children[0].visible = true; // Show the sprite

          if (!first) {
            first = g;
          } else {
            // Second card clicked
            canClick = false; // Disable clicks temporarily

            if (first.actualColor === g.actualColor) {
              // Match found
              first.matched = true;
              g.matched = true;
              first.eventMode = "none"; // Disable further clicks on matched cards
              g.eventMode = "none";
              first = null;
              canClick = true; // Re-enable clicks
            } else {
              // No match
              setTimeout(() => {
                // Obfuscate both cards again
                // Note the tileSize. The important lenght of the canvas is horizontal. It will not wrap around into the next column
                // Unless implemented later.
                first.clear().rect(0, 0, tileSize, tileSize).fill(0x808080);
                first.children[0].visible = false;

                g.clear().rect(0, 0, tileSize, tileSize).fill(0x808080);
                g.children[0].visible = false;

                first = null;
                canClick = true; // Re-enable clicks
              }, 1000); // 1-second delay
            }
          }
        });

        app.stage.addChild(g);
      });
    };

    run();

    return () => {
      isMounted = false;
      if (app.renderer) {
        app.destroy(true);
      }
    };
  }, []);

  return <div ref={ref}></div>;
}
