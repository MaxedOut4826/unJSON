import { Colour } from "./colours.js";

export function log(text, colour = Colour.default) {
    console.log(colour + text + Colour.default);
}
