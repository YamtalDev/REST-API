import {omit} from 'lodash';
import logger from '../utils/logger';
import {Request, Response} from 'express';
import {createUser} from '../service/user.service';
import {CreateUserInput} from '../schema/use.schema';

async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response)
{
    try
    {
        const user = await createUser(req.body);
        return (res.send(user));
    }
    catch(error: any)
    {
        logger.error("Failed to create user", error);
        return (res.status(409).send(error.message));
    }
}

export default (createUserHandler);