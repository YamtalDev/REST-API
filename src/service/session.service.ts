import {get} from 'lodash';
import config from 'config';
import {findUser} from './user.service';
import {FilterQuery, UpdateQuery} from 'mongoose';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import SessionModel, {sessionDocument} from '../model/session.model';

export async function createSession(userId: string, userAgent: string)
{
    const session = await SessionModel.create({user: userId, userAgent});
    return (session.toJSON());
}

export async function findSessions(query: FilterQuery<sessionDocument>)
{
    return (SessionModel.find(query).lean());
}

export async function updateSession
(query: FilterQuery<sessionDocument>,update: UpdateQuery<sessionDocument>)
{
    return (SessionModel.updateOne(query, update));
}

export async function reIssueAccessToken({refreshToken}:{refreshToken: string})
{
    const {decoded} = verifyJwt(refreshToken);
    if(!decoded || !get(decoded, "session"))
    {
        return (false);
    }

    const session = await SessionModel.findById(get(decoded, "session"));
    if(!session || !session.valid)
    {
        return (false);
    }

    const user = await findUser({_id: session.user});
    if(!user)
    {
        return (false);
    }

    const accessToken = signJwt
    ({...user, session: session._id}, {expiresIn: config.get('accessTokenTtl')});

    return (accessToken);
}