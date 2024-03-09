interface CustomButtonProps {
    color: string;
    children: React.ReactNode;
}

interface AuthState {
    userId: string | undefined;
    isAuthenticated: boolean;
    accessToken: string | undefined;
    refreshToken: string | undefined;
}

interface SliderItems {
    id: number;
    img: string;
    heading: string;
    description: string;
    attibute: string;
    attibute_link: string;
};

interface FadeAnimationType {
    targets: string;
    opacity: number[];
    duration: number;
    easing: string;
};

interface NavbarProps {
    countryName: string | null;
}

interface UserContextTypes {
    user: User | null;
    register: (name: string, email: string, password1: string, password2: string, phone: string, country: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<null>;
    sendPasswordResetEmail: (email: string) => Promise<any>;
    resetPassword: (old_password: string, password1:string, password2:string) => Promise<any>;
    confirmPasswordReset: (token: string, uid: string, new_password1: string, new_password2: string) => Promise<any>;
    checkUser: () => Promise<null>;
    rfreshToken: (token: string) => Promise<string|undefined>;
    isLoading: boolean;
}

interface User {
    id: number;
    name: string | null;
    email: string;
    country: string;
    phone: string;
    waitlisted: boolean;
    is_staff: boolean;
    date_joined: string;
    last_login: string;
}

interface Coordinates {
    latitude: number;
    longitude: number;
}