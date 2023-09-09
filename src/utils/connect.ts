import log from './logger';
import config from 'config';
import mongoose from 'mongoose';

async function connect()
{
    const dbUri = config.get<string>('dbUri');
    try
    {
        await (mongoose.connect(dbUri));
        log.info('Database connected');
    }
    catch(error)
    {
        log.error('Could not connect to Database', error);
        process.exit(1);
    }
}

export default (connect);
