import logger from './logger';
import config from 'config';
import mongoose from 'mongoose';

async function connect()
{
    const dbUri = config.get<string>('dbUri');
    try
    {
        await (mongoose.connect(dbUri));
        logger.info('Database connected');
    }
    catch(error)
    {
        logger.error('Could not connect to Database', error);
        process.exit(1);
    }
}

export default (connect);
