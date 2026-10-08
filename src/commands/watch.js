import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { watch } from "chokidar";
import { dirname, join, relative, resolve } from "node:path";
import { log } from "../common/log.js";
import { Colour } from "../common/colours.js";

const UNJSON_ROOT_DIRECTORY = "unjson";
const SOURCE_DIRECTORY = resolve(UNJSON_ROOT_DIRECTORY, "input");
const OUTPUT_DIRECTORY = resolve(UNJSON_ROOT_DIRECTORY, "output");

mkdirSync(SOURCE_DIRECTORY, { recursive: true });
mkdirSync(OUTPUT_DIRECTORY, { recursive: true });

const watcher = watch(SOURCE_DIRECTORY, {
    ignored: /(?:^|[/\\])[^/\\]*\.(?!json$)[^/\\]*$/,
});

watcher.on("change", unformatJSON);
watcher.on("add", unformatJSON);
watcher.on("error", (error) => console.error("Watcher error:", error));

log(`Watching JSON files within '${SOURCE_DIRECTORY}'...`, Colour.yellow);

function unformatJSON(inputPath) {
    const outputPath = join(
        OUTPUT_DIRECTORY,
        relative(SOURCE_DIRECTORY, inputPath),
    );

    try {
        const data = JSON.parse(readFileSync(inputPath, "utf8"));

        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, JSON.stringify(data));

        log(
            `Unformatted ${relative(SOURCE_DIRECTORY, inputPath)} → ${relative(OUTPUT_DIRECTORY, outputPath)}`,
            Colour.green,
        );
    } catch {}
}
