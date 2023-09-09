import mongoose from 'mongoose';
import {UserDocument} from './user.model'

const sessionData =
{
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    valid: {type: Boolean, default: true},
    userAgent: {type: String}
};

export interface SessionDocument extends mongoose.Document
{
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    UpdatedAt: Date;
}

const SessionSchema = new mongoose.Schema(sessionData, {timestamps: true});

const SessionModel = mongoose.model<SessionDocument>("Session", SessionSchema);
export default (SessionModel);