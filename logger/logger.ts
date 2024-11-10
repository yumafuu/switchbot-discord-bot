import * as log from "https://deno.land/std@0.99.0/log/mod.ts";
import { LogRecord } from "https://deno.land/std@0.99.0/log/logger.ts";

const filename = "/tmp/log/app.log";

const formatter = (logRecord: LogRecord) => {
  const { datetime, levelName, msg } = logRecord;

  const d = new Date(datetime.getTime() - datetime.getTimezoneOffset() * 6e4);
  const logTime = d.toISOString().slice(0, -5) +
    d.toString().replace(/^.*GMT([-+]\d{2})(\d{2}).*$/, "$1:$2");

  return `${logTime} ${levelName.padEnd(7)} ${msg}`;
};

await log.setup({
  handlers: {
    default: {
      console: new log.handlers.ConsoleHandler("DEBUG", {
        formatter,
      }),

      // file出力形式の定義
      file: new log.handlers.FileHandler("DEBUG", {
        filename,
        formatter,
      }),
    },
    production: {
      console: new log.handlers.ConsoleHandler("DEBUG", {
        formatter,
      }),
    },
  },

  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console", "file"],
    },
    production: {
      level: "DEBUG",
      handlers: ["console"]
    }
  },
});

const loggerType = Deno.env.get("LOGGER_TYPE") || "default"
const Logger = log.getLogger(loggerType);
console.log(`logfile: ${filename}`);

export { Logger };
