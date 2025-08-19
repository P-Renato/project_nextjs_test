"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./routers/products"));
const users_1 = __importDefault(require("./routers/users"));
const productsController_1 = require("./controllers/productsController");
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// middleware 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.get('/', (req, res) => {
    res.send('Backend is running with TypeScript!');
    res.json('Backend is running with TypeScript!');
});
app.get('/api/products', productsController_1.getProducts);
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});
app.use('/api/', products_1.default);
app.use("/login", users_1.default);
app.use("/api/users", users_1.default);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
