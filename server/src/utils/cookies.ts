import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";

const secure = NODE_ENV !== "development";

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure,
};
const ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000; // 15min
const REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    maxAge: ACCESS_TOKEN_EXPIRATION,
    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRATION),
}); // 15 min
export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    maxAge: REFRESH_TOKEN_EXPIRATION,
    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION),
}); // 7 days

type Params = {
    res: Response;
    accessToken: string;
    refreshToken: string;
    rememberMe?: boolean;
};

export const setAuthCookies = ({
    res,
    accessToken,
    refreshToken,
    rememberMe,
}: Params) => {
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
    if (rememberMe) {
        res.cookie(
            "refreshToken",
            refreshToken,
            getRefreshTokenCookieOptions()
        );
    } else {
        const opts = { ...getRefreshTokenCookieOptions() };
        delete opts.maxAge;
        delete opts.expires;

        res.cookie("refreshToken", refreshToken, opts);
    }
    return res;
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("accessToken").clearCookie("refreshToken");
    return res;
};
