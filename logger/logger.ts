import * as log from "https://deno.land/std@0.99.0/log/mod.ts";
import { LogRecord } from "https://deno.land/std@0.99.0/log/logger.ts";

const filename = "./log/app.log";

const formatter = (logRecord: LogRecord) => {
  const { datetime, levelName, msg } = logRecord;

  const d = new Date(datetime.getTime() - datetime.getTimezoneOffset() * 6e4);
  const logTime = d.toISOString().slice(0, -5) +
    d.toString().replace(/^.*GMT([-+]\d{2})(\d{2}).*$/, "$1:$2");

  return `${logTime} ${levelName.padEnd(7)} ${msg}`;
};

await log.setup({
  handlers: {
    // console出力形式の定義
    console: new log.handlers.ConsoleHandler("DEBUG", {
      formatter,
    }),

    // file出力形式の定義
    file: new log.handlers.FileHandler("DEBUG", {
      filename,
      formatter,
    }),
  },

  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console", "file"],
    },
  },
});

// getLogger()を無引数で実行すると"default"のloggerを取得する
const Logger = log.getLogger();
console.log(`logfile: ${filename}`);

export { Logger };
