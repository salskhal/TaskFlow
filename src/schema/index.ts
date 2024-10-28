import * as z from "zod";

export const RegisterSchema = z.object({
    firstName: z.string().min(4, {
        message: "Please Enter Your First Name"
    }),
    lastName: z.string().min(4, {
        message: "Please Enter Your Last Name"
    }),
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})

export const OTPSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})


export const CreatePTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["todo", "in progress", "completed"]),
    priority: z.enum(["high", "medium", "low"]),
    date: z.date({
        required_error: "Please select a date",
    }),
});
