/******************************************************************************
 * @file user.schema.ts
 * @description Defines the MongoDB schema for the user use case.
******************************************************************************/
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema
({
    name: {type: String, required: true},
    email: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    salary: {type: Number, require: true},
    authentication: 
    {
        idNumber: {type: String, required: true, select: false}, 
        salt: {type: String, select: false},
    },
});

export const UserModel = mongoose.model('User', UserSchema);
