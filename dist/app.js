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
const constants_1 = __importDefault(require("./constants"));
const log_utils_1 = __importDefault(require("./utils/log.utils"));
const browser_service_1 = require("./services/browser.service");
const loga = (...optionalParams) => {
    console.log(optionalParams);
};
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    log_utils_1.default.log("Starting");
    const service = new browser_service_1.BrowserService({
        defaultViewport: { width: 2000, height: 1000 },
        headless: false,
    });
    log_utils_1.default.log("Accessing page...");
    service.goToPage(constants_1.default.PAGES.PREFERENCIES);
    log_utils_1.default.log("Searching for login inputs...");
    const [emailInput, senhaInput] = yield Promise.all([
        yield service.getElement('input[name="email"]'),
        yield service.getElement('input[name="senha"]'),
    ]);
    yield (emailInput === null || emailInput === void 0 ? void 0 : emailInput.type("lucas.af92@hotmail.com"));
    yield (senhaInput === null || senhaInput === void 0 ? void 0 : senhaInput.type("winez@o"));
    log_utils_1.default.log("Fim");
});
start();
