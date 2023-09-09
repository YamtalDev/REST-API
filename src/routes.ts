import {Express, Request, Response, Router} from 'express';
import validateResource from './middleware/validateResource';
import createUserHandler from './controller/user.controller';
import { createUserSchema } from './schema/use.schema';

function routes(app: Express)
{
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post("/api/users", validateResource(createUserSchema), createUserHandler);
}

export default (routes);