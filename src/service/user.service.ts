import {omit} from 'lodash';
import UserModel, {UserDocument, UserInput} from '../model/user.model'
import { FilterQuery } from 'mongoose';
import userModel from '../model/user.model';

export async function createUser(input: UserInput)
{
    try
    {
        const user = await UserModel.create(input);
        return (user);
    }
    catch(error: any)
    {
        throw new Error(error);
    }
}

export async function validatePassword({email, password}:{email: string, password: string})
{
    const user = await UserModel.findOne({email});  
    if(!user)
    {
        return (false);
    }

    const isValid = await user.comparePassword(password);
    if(!isValid)
    {
        return (false);
    }

    return (user);
}

export async function findUser(query: FilterQuery<UserDocument>)
{
    return (userModel.findOne(query).lean());
}