import {object, string, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password should be minimum of 6 characters"),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: "email is required"
        }).email("Not a valid email"),

    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"],
    }),
});

export type createUserInput = TypeOf<typeof createUserSchema>;