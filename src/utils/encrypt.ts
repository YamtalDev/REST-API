import crypto from "crypto";
/******************************************************************************
 * @description
 * @returns 
******************************************************************************/
export const random = () => crypto.randomBytes(128).toString('base64');
/******************************************************************************
 * @description 
 * @param salt
 * @param id 
 * @returns 
******************************************************************************/
const secret = process.env.SECRET as string;
export const authentication = (salt: string, id: string) => 
{
    return (crypto.createHmac('sha256', [salt, id].join('/')).update(secret).digest('hex'));
}