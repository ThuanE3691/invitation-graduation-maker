"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const guest_1 = __importDefault(require("./routes/guest"));
const prismaClient_1 = __importDefault(require("./db/prismaClient"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/user", user_1.default);
app.use("/api/guest", guest_1.default);
const PORT = 3000;
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.$disconnect();
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
}));
