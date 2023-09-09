import config from 'config';
import jwt from 'jsonwebtoken';

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined)
{
    return (jwt.sign(object, privateKey, {...(options && options), algorithm: 'RS256',}));
}

export function verifyJwt(token: string)
{
    try
    {
        const decoded = jwt.verify(token, publicKey);
        return ({
            valid: true, 
            expired: false, 
            decoded
        });
    }
    catch(error: any)
    {
        return ({
            valid: false, 
            expired: error.message === "jwt expired", 
            decoded: null
        });
    }
}