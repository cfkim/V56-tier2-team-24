const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        // In development mode, provide default values for optional variables
        if (process.env.NODE_ENV === "development") {
            switch (key) {
                case "RESEND_API_KEY":
                    return "test-key";
                case "EMAIL_SENDER":
                    return "noreply@beacon.com";
                case "MONGO_URI":
                    return "mongodb://localhost:27017/beacon";
                case "JWT_SECRET":
                    return "dev-secret-key";
                case "JWT_REFRESH_SECRET":
                    return "dev-refresh-secret-key";
                default:
                    break;
            }
        }
        throw Error(`Missing String environment variable for ${key}`);
    }

    return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4004");
export const MONGO_URI = getEnv("MONGO_URI");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
