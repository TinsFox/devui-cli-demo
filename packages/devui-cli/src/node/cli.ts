import { cac } from "cac";
import { createLogger } from "./logger";
import colors from "picocolors";
const cli = cac("devui-cli");
// dev
cli
  .command("[root]", "start dev server") // default command
  .alias("serve") // the command is called 'serve' in Vite's API
  .alias("dev") // alias to align with the script name
  .alias("start") // alias to align with the script name
  .option("--host [host]", `[string] specify hostname`)
  .action(async (root: string, options: any) => {
    // output structure is preserved even after bundling so require()
    // is ok here
    const { createServer } = await import("./server");

    try {
      await createServer();
    } catch (e) {
      createLogger(options.logLevel).error(
        colors.red(`error when starting dev server:\n${e.stack}`),
        { error: e }
      );
      process.exit(1);
    }
  });

cli.help();
cli.version(require("../../package.json").version);

cli.parse();
