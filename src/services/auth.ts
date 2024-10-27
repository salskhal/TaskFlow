import api from "./api";

export const registerUser = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) => {
    try {
        const response = await api.post("/users/register", data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const verifyOTP = async (data: {
    email: string,
    otp: string
}) => {
    try {
        const response = await api.post("/users/verify", data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (data: {
    email: string;
    password: string
}) => {
    try {
        const response = await api.post("/users/login", data)
        // console.log(response.data)
        return response.data.user
    } catch (error) {
        if (error.response) {
            // Backend responded with an error (invalid credentials, etc.)
            const { status, data } = error.response;

            if (status === 401) {
                // Handle Unauthorized (Invalid credentials or email not verified)
                throw new Error(data.message || "Invalid email or password");
            }

            // Handle other backend errors
            throw new Error(data.message || "An error occurred while logging in");
        } else if (error.request) {
            // No response was received from the backend
            throw new Error("No response from the server. Please try again later.");
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error("An error occurred while logging in. Please try again.");
        }
    }
}


export const logout = async () => {
    const response = await api.post('/users/logout');
    return response.data; // Return the success message
}