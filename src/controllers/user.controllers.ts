import {Request, Response} from "express";
import {random, authentication} from "../auth/user.auth";
import 
{
    createUser,deleteUserById,
    getUserByEmail,getUserById,getUsers
} from "../schema/user.schema";

export const registerUser = async (req: Request, res: Response) =>
{
    try
    {
        const {name, email, country, city, salary, idNumber} = req.body;
        if (!email || !name || !country || !city || !salary || !idNumber)
        {
            return (res.sendStatus(400).json({error: "All fields required"}));
        }

        const existingUser = await getUserByEmail(email);
        if(existingUser)
        {
            return (res.sendStatus(400).json({error: "User already exist in data base"}));
        }

        const salt = random();   
        const user = await createUser({
            name, email, country, city, salary, 
            authentication: {salt, idNumber: authentication(salt, idNumber)}
        });

        return (res.status(201).json(user).end());
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({error: "Error creating user"});
    }
};

export const getAllUsers = async (req: Request, res: Response) =>
{
    try
    {
        const users = await getUsers();
        return (res.status(200).json(users));
    }
    catch(error)
    {
        console.log(error.message);
        return (res.sendStatus(500).json({error: "Error accessing users"}));
    }
}

export const getUser = async (req: Request, res: Response) =>
{
    try
    {
        const {id} = req.body;
        if(!id)
        {
            return (res.sendStatus(400).json({error: "Must fill the id"}));
        }

        const user = await getUserById(id);
        return (res.status(200).json(user));
    }
    catch(error)
    {
        console.log(error.message);
        return (res.sendStatus(500).json({error: "Error accessing users"}));
    }
}

export const deleteUser = async (req: Request, res: Response) =>
{
    try
    {
        const {id} = req.body;
        const deletedUser = await deleteUserById(id);
        return (res.status(201).json(deletedUser));
    }
    catch(error)
    {
        console.log(error.message);
        return (res.sendStatus(500).json({error: "Error deleting user"}));
    }
}

export const updateUser = async (req: Request, res: Response) =>
{
    try
    {
        const {id} = req.params;
        const {name} = req.body;
        if(!name)
        {
            return (res.sendStatus(500).json({error: "A name must be provided"}));
        }

        const user = await getUserById(id);
        user.name = name;
        await user.save();
        return (res.status(200).json(user).end());
    }
    catch(error)
    {
        console.log(error.message);
        return (res.sendStatus(500).json({error: "Error updating user"}));
    }
}

