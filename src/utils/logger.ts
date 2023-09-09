import logger from 'pino';
import dayjs from 'dayjs';

const logOptions =
{
    prettyPrint: false,
    base: { pid: false },
    timestamp: () => `,"time":"${dayjs().format()}"`,
    messageKey: 'message',
};

const log = logger(logOptions);

export default log;

