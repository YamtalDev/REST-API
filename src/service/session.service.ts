import SessionModel from '../model/session.model';

async function createSession(userId: string, userAgent: string)
{
    const session = await SessionModel.create({user: userId, userAgent});
    return (session.toJSON());
}

export default (createSession);