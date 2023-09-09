import {omit} from 'lodash';
import logger from '../utils/logger';
import {Request, Response} from 'express';
import {createUser} from '../service/user.service';
import { createUserInput } from '../schema/use.schema';

async function createUserHandler(req: Request<{}, {}, createUserInput["body"]>, res: Response)
{
    try
    {
        const user = await createUser(req.body);
        return (res.send(omit(user.toJSON(), "password")));
    }
    catch(error: any)
    {
        logger.error(error);
        return (res.status(409).send(error.message));
    }
}

export default (createUserHandler);