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
const puppeteer_1 = __importDefault(require("puppeteer"));
let browser;
const BrowserUtils = {
    initBrowser: () => __awaiter(void 0, void 0, void 0, function* () { return yield puppeteer_1.default.launch({ headless: false }); }),
    goToPage: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const page = yield (browser === null || browser === void 0 ? void 0 : browser.newPage());
        yield (page === null || page === void 0 ? void 0 : page.goto(url));
        yield (page === null || page === void 0 ? void 0 : page.setViewport({ width: 1080, height: 1024 }));
    }),
    close: () => __awaiter(void 0, void 0, void 0, function* () {
        yield (browser === null || browser === void 0 ? void 0 : browser.close());
    }),
};
exports.default = BrowserUtils;
