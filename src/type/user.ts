export type User = {
    verified: boolean;
    username: string;
    purchased_flags: number;
    premium: boolean;
    phone: null | string;
    nsfw_allowed: null | boolean;
    mfa_enabled: boolean;
    id: string;
    flags: null;
    email: string;
    discriminator: string;
    bio: string;
    banner_color: null | string;
    banner: null | string;
    avatar: string;
    accent_color: null | string;
    mobile: boolean;
    desktop: boolean;
};

