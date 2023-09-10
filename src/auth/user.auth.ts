import crypto from "crypto";

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, id: string) => 
{
    return (crypto.createHmac('sha256', [salt, id].join('/')).update(process.env.SECRET as string).digest('hex'));
}