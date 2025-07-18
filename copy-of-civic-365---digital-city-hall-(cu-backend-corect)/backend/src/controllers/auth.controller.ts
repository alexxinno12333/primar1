
import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const result = await userService.login(email, password);
        res.json(result);
    } catch (error) {
        const err = error as Error;
        if (err.message === 'Invalid credentials' || err.message === 'Parola sau email invalid.') {
            return res.status(401).json({ message: 'Parola sau email invalid.' });
        }
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Numele, emailul și parola sunt obligatorii.' });
    }

    try {
        const newUser = await userService.register(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        const err = error as Error;
        if (err.message === 'Acest email este deja utilizat.') {
            return res.status(409).json({ message: err.message });
        }
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Eroare internă a serverului' });
    }
};


export const getMe = (req: AuthenticatedRequest, res: Response) => {
    // The user object is attached to the request by the authMiddleware
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    // Return user data without the password hash
    const { passwordHash, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
};