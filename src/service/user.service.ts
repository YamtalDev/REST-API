import User, {UserDocument} from '../model/user.model'

export async function createUser()
{
    try
    {
        return await User.create(input);
    }
    catch(error)
    {
        throw new Error(error);
    }
}
function findUser(){

}
}