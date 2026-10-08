#!/usr/bin/env node

// Small scale commands handler because I don't have many commands

import { Colour } from "../common/colours.js";
import { log } from "../common/log.js";

const COMMANDS_HELP_PAGE = `unJSON [v1.0.0]
By MaxedOut4826

A tool for returning unformatted JSON

Commands:
  unjson watch    Watches for changes in the 'unjson/input' directory & produces an unformatted output
  unjson help     Displays the commands help page
`;

const command = process.argv[2];

if (!command) {
    log(COMMANDS_HELP_PAGE, Colour.cyan);
} else {
    switch (command) {
        case "watch":
            await import("../src/commands/watch.js");
            break;
        case "help":
            log(COMMANDS_HELP_PAGE, Colour.cyan);
            break;
        default:
            log(
                "Invalid command; try 'unjson help' to display a full commands list",
                Colour.red,
            );
    }
}
