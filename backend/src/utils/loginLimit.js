import rateLimit from "express-rate-limit"

export const loginLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Too many login attempts"
})
