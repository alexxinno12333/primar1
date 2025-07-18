
import { users } from '../data/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../types';

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    // In a real app, this would be a database query:
    // return db.user.findUnique({ where: { email } });
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const login = async (email: string, password: string): Promise<{ token: string; user: Omit<User, 'passwordHash'> }> => {
    const user = await findUserByEmail(email);

    if (!user || !user.passwordHash) {
        throw new Error('Parola sau email invalid.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
        throw new Error('Parola sau email invalid.');
    }

    // Exclude password hash from the user object in the token and response
    const { passwordHash, ...userPayload } = user;

    const token = jwt.sign(userPayload, config.jwtSecret!, { expiresIn: '1d' });
    
    return { token, user: userPayload };
};

export const register = async (name: string, email: string, password: string): Promise<Omit<User, 'passwordHash'>> => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error('Acest email este deja utilizat.');
    }

    const passwordHash = bcrypt.hashSync(password, 8);

    const newUser: User = {
        id: `user_${new Date().getTime()}`,
        name,
        email,
        role: 'citizen',
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        passwordHash,
    };

    users.push(newUser);

    const { passwordHash: _, ...userToReturn } = newUser;
    return userToReturn;
};