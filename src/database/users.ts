import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, required: true, select: false},
        sessionToken: {type: String, select: false},
    },
});

// Create a model for the user
export const UserModel = mongoose.model("User", UserSchema);

// Simple functions for interacting with the database

export const getUsers = () => {
    return UserModel.find();
}

export const getUserByEmail = (email: string) => {
    return UserModel.findOne({email: email});
}

export const getUserBySessionToken = (sessionToken: string) => {
    return UserModel.findOne({"authentication.sessionToken": sessionToken});
}

export const getUserById = (id: string) => {
    return UserModel.findById(id);
}

export const createUser = (values: Record<string, any>) => {
    return new UserModel(values).save().then((user) => {
        return user.toObject();
    });
}

export const deleteUserById = (id: string) => {
    return UserModel.findOneAndDelete({_id: id});
}

export const updateUserById = (id: string, values: Record<string, any>) => {
    return UserModel.findOneAndUpdate({_id: id}, values);
}