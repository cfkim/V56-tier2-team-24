import { CookieOptions, Response } from "express"
import { NODE_ENV } from "../constants/env"

const secure = NODE_ENV !== "development"

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure
}

export const getAccessTokenCookieOptions = (): CookieOptions => ({...defaults, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)})
export const getRefreshTokenCookieOptions = (): CookieOptions => ({...defaults, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)})

type Params = {
    res: Response,
    accessToken: string,
    refreshToken: string,
    rememberMe?: Boolean
}

export const setAuthCookies = ({res, accessToken, refreshToken, rememberMe}: Params) => {
    if (rememberMe) {
        res.cookie("refreshToken", refreshToken, getAccessTokenCookieOptions())
    }
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    return res
}

export const clearAuthCookies = (res: Response) => res.clearCookie("accessToken").clearCookie("refreshToken")