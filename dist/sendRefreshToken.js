"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = (res, token) => {
    res.cookie("rfs", token, {
        httpOnly: true,
    });
};
//# sourceMappingURL=sendRefreshToken.js.map