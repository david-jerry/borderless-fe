"use client"

import { createContext } from 'react';

const AuthContext = createContext<UserContextTypes | null>(null);

export default AuthContext;