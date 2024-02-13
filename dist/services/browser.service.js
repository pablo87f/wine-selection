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
exports.BrowserService = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class BrowserService {
    constructor(options) {
        this.delay = (ms) => new Promise((_) => setTimeout(_, ms));
        this.browser = undefined;
        this.currentPage = undefined;
        this.options = options;
    }
    getBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.browser) {
                this.browser = yield puppeteer_1.default.launch(this.options);
            }
            return this.browser;
        });
    }
    goToPage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield this.getBrowser();
            this.currentPage = yield browser.newPage();
            yield this.currentPage.goto(url, { waitUntil: "networkidle0" });
            yield this.currentPage.setViewport({ width: 2000, height: 1000 });
        });
    }
    close() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.browser) === null || _a === void 0 ? void 0 : _a.close());
        });
    }
    getElement(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentPage) {
                return yield this.currentPage.$(selector);
            }
            return null;
        });
    }
}
exports.BrowserService = BrowserService;
