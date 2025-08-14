import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";

const secure = NODE_ENV !== "development";

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure,
};
const ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000;
const REFRESH_TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    maxAge: ACCESS_TOKEN_EXPIRATION,
    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRATION),
}); // 15 s
export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    maxAge: REFRESH_TOKEN_EXPIRATION,
    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION),
}); // 30 m

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
    if (rememberMe) {
        res.cookie(
            "refreshToken",
            refreshToken,
            getRefreshTokenCookieOptions()
        );
    }
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
    return res;
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("accessToken", getAccessTokenCookieOptions()).clearCookie(
        "refreshToken",
        getRefreshTokenCookieOptions()
    );
    return res;
};
