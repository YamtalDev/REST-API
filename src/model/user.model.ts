import bcrypt from 'bcrypt';
import config from 'config';
import mongoose from 'mongoose';

const userData =
{
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
};

export interface UserInput
{
    email: string;
    name: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document
{
    createdAt: Date;
    UpdatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(userData, {timestamps: true});

userSchema.pre<UserDocument>("save", async function (next)
{
    if(!this.isModified("password"))
    {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWakFactor"));
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
    return next();
});


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean>
{
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(((e) => false));
}

const UserModel = mongoose.model("User", userSchema);
export default (UserModel);