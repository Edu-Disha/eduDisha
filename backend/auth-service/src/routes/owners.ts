import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Owner from '../models/OwnersLook';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Login Route
router.post('/login', async (req, res) => {
    const { email, phone, password } = req.body;

    try {
        let owner;
        if (email) {
            owner = await Owner.findOne({ email });
        } else if (phone) {
            owner = await Owner.findOne({ phone });
        } else {
            return res.status(400).json({ msg: 'Email or phone number is required' });
        }

        if (!owner) {
            return res.status(404).json({ msg: 'Owner not found' });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: owner._id, email: owner.email, phone: owner.phone },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new Owner
router.post('/create', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        let owner = await Owner.findOne({ email });
        if (owner) return res.status(400).json({ msg: 'Owner already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        owner = new Owner({
            name,
            email,
            phone,
            password: hashedPassword,
            schoolIds: []
        });

        await owner.save();
        res.json(owner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all admins
router.get('/', async (req, res) => {
    try {
        const admins = await Owner.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an Owner
router.put('/update/:id', async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        const owner = await Owner.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true });
        if (!owner) return res.status(404).json({ msg: 'Owner not found' });

        res.json(owner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an Owner
router.delete('/delete/:id', async (req, res) => {
    try {
        const owner = await Owner.findByIdAndDelete(req.params.id);
        if (!owner) return res.status(404).json({ msg: 'Owner not found' });

        res.json({ msg: 'Owner deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
