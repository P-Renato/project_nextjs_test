"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.addNewUser = void 0;
const addNewUser = (req, res, next) => {
    res.json({ msg: "new user added!" });
};
exports.addNewUser = addNewUser;
const loginUser = (req, res, next) => {
    res.json({ msg: "user logged in!" });
};
exports.loginUser = loginUser;
