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
const shortid_1 = __importDefault(require("shortid"));
const stream_to_buffer_1 = require("@jorgeferrero/stream-to-buffer");
const sharp_1 = __importDefault(require("sharp"));
const aws_sdk_1 = require("aws-sdk");
const client = new aws_sdk_1.S3({
    accessKeyId: process.env.AWS_KEY_ACCESS,
    secretAccessKey: process.env.AWS_SECRET_KEY_ACCESS,
});
exports.processUploads = (files) => __awaiter(void 0, void 0, void 0, function* () {
    let uploads600 = [];
    const uploads800 = [];
    const uploads1500 = [];
    const uploadsRaw = [];
    for (let file of files) {
        const { createReadStream, data } = yield Promise.resolve(file);
        const content = data || (yield stream_to_buffer_1.streamToBuffer(createReadStream()));
        const id = shortid_1.default.generate();
        const filename600 = `${id}_600.jpeg`;
        const filename800 = `${id}_800.jpeg`;
        const filename1500 = `${id}_1500.jpeg`;
        const filenameRaw = `${id}_raw.jpeg`;
        const size600 = yield sharp_1.default(content)
            .resize(600, 600, {
            fit: "cover"
        })
            .jpeg()
            .toBuffer();
        const size800 = yield sharp_1.default(content)
            .resize(800, 800, {
            fit: "cover"
        })
            .jpeg()
            .toBuffer();
        const size1500 = yield sharp_1.default(content)
            .resize(1500, 900, {
            kernel: sharp_1.default.kernel.nearest,
            fit: "cover"
        })
            .jpeg()
            .toBuffer();
        const sizeRaw = yield sharp_1.default(content)
            .jpeg()
            .toBuffer();
        uploads600.push({
            name: filename600,
            content: size600
        });
        uploads800.push({
            name: filename800,
            content: size800
        });
        uploads1500.push({
            name: filename1500,
            content: size1500
        });
        uploadsRaw.push({
            name: filenameRaw,
            content: sizeRaw
        });
    }
    const clientUpload = ({ name, content }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client
            .upload({
            Key: name,
            ACL: 'public-read',
            Body: content,
            ContentType: 'image/jpeg',
            Bucket: 'keyconomy-uploads'
        }).promise();
        return response.Location;
    });
    uploads600.map(({ name, content }) => __awaiter(void 0, void 0, void 0, function* () {
        yield clientUpload({ name, content });
    }));
    uploads800.map(({ name, content }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield clientUpload({ name, content });
    }));
    uploads1500.map(({ name, content }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield clientUpload({ name, content });
    }));
    uploadsRaw.map(({ name, content }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield clientUpload({ name, content });
    }));
    const results600 = uploads600.map(({ name }) => {
        return `https://keyconomy-uploads.s3.amazonaws.com/${name}`;
    });
    const results800 = uploads800.map(({ name }) => {
        return `https://keyconomy-uploads.s3.amazonaws.com/${name}`;
    });
    const results1500 = uploads1500.map(({ name }) => {
        return `https://keyconomy-uploads.s3.amazonaws.com/${name}`;
    });
    const resultsRaw = uploadsRaw.map(({ name }) => {
        return `https://keyconomy-uploads.s3.amazonaws.com/${name}`;
    });
    return { results600, results800, results1500, resultsRaw };
});
//# sourceMappingURL=uploader.js.map