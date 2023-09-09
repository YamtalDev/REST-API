import {Request, Response} from "express";
import {random, authentication} from "../helpers"; 
import {createUser, getUserByEmail} from "db/user.schema";

export const register = async(req: Request, res: Response) =>
{
    try
    {
        const {email, password, username} = req.body;
        if(!email || !password || !username)
        {
            return (res.sendStatus(400));
        }
    
        const existingUser = await getUserByEmail(email);
        if(existingUser)
        {
            return (res.sendStatus(400));
        }

        const salt = random();
        const user = await createUser({email,username, authentication:
        {salt, password: authentication(salt, password)}});

        return (res.sendStatus(200).json(user).end());
    }
    catch(error)
    {
        console.log(error);
        return (res.sendStatus(400));
    }
}
