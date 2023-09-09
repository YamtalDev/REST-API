import UserModule, {UserDocument, UserInput} from '../model/user.model'
import {FilterQuery} from 'mongoose';

export async function createUser(input: UserInput)
{
    try
    {
        return await UserModule.create(input);
    }
    catch(error: any)
    {
        throw new Error(error);
    }
}