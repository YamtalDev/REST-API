import {Router} from "express";
import authentication from "./authentication";

const router = Router();
export default (): Router =>
{
    authentication(router);
    return  (router);
}