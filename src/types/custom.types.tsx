interface CustomButtonProps {
    color: string;
    children: React.ReactNode;
}

interface NavbarProps {
    countryName: string | null;
}

interface UserContextTypes {
    user: User | null;
    register: (name: string, email: string, password: string, phone: string, country: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
    isLoading: boolean;
}

interface User {
    id: number;
    name: string | null;
    email: string;
    phone: string;
    country: string;
    joined: Date;
    token: string;
    refreshToken: string;
    isAdmin: boolean;
}

interface Coordinates {
    latitude: number;
    longitude: number;
}