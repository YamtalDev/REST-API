import logger from 'pino';
import dayjs from 'dayjs';
import pinoPretty from 'pino-pretty';

const log = logger({
  prettyPrint: false,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  formatters: {
    level: (label) => ({ level: label }),
  },
  prettifier: pinoPretty,
});

export default log;