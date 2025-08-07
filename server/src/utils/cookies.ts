import { CookieOptions, Response } from "express"
import { NODE_ENV } from "../constants/env"

const secure = NODE_ENV !== "development"

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure
}

export const getAccessTokenCookieOptions = (): CookieOptions => ({...defaults, expires: new Date(Date.now() + 15 * 1000)}) // 15 s
export const getRefreshTokenCookieOptions = (): CookieOptions => ({...defaults, expires: new Date(Date.now() + 30 * 60 * 1000)}) // 30 m

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
    res.cookie("accessToken", accessToken, getRefreshTokenCookieOptions())
    return res
}

export const clearAuthCookies = (res: Response) => res.clearCookie("accessToken").clearCookie("refreshToken")