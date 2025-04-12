import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const TRAVEL_STYLES = ['budget', 'midrange', 'luxury'];

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/],
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
        },
        profilePhoto: {
            type: String,
            default: '',
        },
        bio: {
            type: String,
            maxlength: 80,
            default: '', //add here - the defult photo - 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3D%2522default%2Bprofile%2Bpicture%2522&psig=AOvVaw39923hMb0WOkCi1amRR9at&ust=1744548830267000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLC-xf7E0owDFQAAAAAdAAAAABAE'
        },
        interests: {
            type: [String],
            default: [],
        },
        languages: {
            type: [String],
            default: [],
        },
        travelStyle: {
            type: String,
            enum: TRAVEL_STYLES,
            default: 'midrange',
        },
        matchedUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        swipedUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = models.User || model('User', UserSchema);

export default User;
