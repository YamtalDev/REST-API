import {Request, Response} from 'express';
import createSession from '../service/session.service';
import {validatePassword} from '../service/user.service';

async function createUserSessionHandler(req: Request, res: Response)
{
    const user = await validatePassword(req.body);
    if(!user)
    {
        return (res.status(401).send("Invalid email or password"));
    }

    const session = createSession(user._id, req.get("user-agent") || "");



    //Create an eccess token and a refresh token 

    // return eccess and refresh

}


export default (createUserSessionHandler);