import logger from '../utils/logger';
import {Request, Response} from 'express';
import {createUser} from '../service/user.service';

async function createUserHandler(req: Request, res: Response)
{
    try
    {
        const user = await createUser(req.body);
        return (user);
    }
    catch(error: any)
    {
        logger.error(error);
        return (res.status(409).send(error.message));
    }
}

export default (createUserHandler);