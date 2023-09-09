import bcrypt from 'bcrypt';
import config from 'config';
import mongoose from 'mongoose';
import {UserDocument} from './user.model'
import { boolean } from 'zod';

const sessionData =
{
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    valid: {type: Boolean, default: true},
    userAgent: {type: String}
};

export interface SchemaDocument extends mongoose.Document
{
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    UpdatedAt: Date;
}

const SessionSchema = new mongoose.Schema(sessionData, {timestamps: true});

const SessionModel = mongoose.model("Session", SessionSchema);
export default (SessionModel);