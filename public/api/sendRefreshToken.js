"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = (res, token) => {
    res.cookie("typefeel_sesh", token, {
        domain: process.env.NODE_ENV !== "production" ? "localhost" : ".typefeel.com",
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV !== "production" ? false : true
    });
};
//# sourceMappingURL=sendRefreshToken.js.map