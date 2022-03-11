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
const typeorm_1 = require("typeorm");
const Banker_1 = require("./entities/Banker");
const Client_1 = require("./entities/Client");
const Transaction_1 = require("./entities/Transaction");
const express_1 = __importDefault(require("express"));
const create_clients_1 = require("./routes/create_clients");
const create_banker_1 = require("./routes/create_banker");
const create_transaction_1 = require("./routes/create_transaction");
const app = (0, express_1.default)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'typeorm_user',
            password: 'password',
            database: 'typeormcourse',
            entities: [Client_1.Client, Banker_1.Banker, Transaction_1.Transaction],
            synchronize: true
        });
        console.log('Connected to DB');
        app.use(express_1.default.json());
        app.use(create_clients_1.createClientRouter);
        app.use(create_banker_1.createBankerRouter);
        app.use(create_transaction_1.createTransactionRouter);
        app.listen(8080, () => {
            console.log('Now running on port 8080');
        });
    }
    catch (error) {
        console.log('Could not connect to DB.', error.message);
        throw new Error("Could not connect to DB");
    }
});
main();
//# sourceMappingURL=index.js.map