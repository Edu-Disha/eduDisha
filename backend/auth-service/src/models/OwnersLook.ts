import mongoose from 'mongoose';

const ownersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    schoolIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }]
});

const Owner = mongoose.model('Owner', ownersSchema);

export default Owner;
