"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuxService = void 0;
const common_1 = require("@nestjs/common");
const mux_node_1 = __importDefault(require("@mux/mux-node"));
const prisma_service_1 = require("src/prisma/prisma.service");
const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
const mux = new mux_node_1.default({
    tokenId: MUX_TOKEN_ID,
    tokenSecret: MUX_TOKEN_SECRET,
});
const video = mux.video;
let MuxService = class MuxService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadVideoToMux(videoUrl, chapterId) {
        var _a, _b;
        try {
            const asset = await video.assets.create({
                input: [{ url: videoUrl }],
                playback_policy: ['public'],
                test: false,
            });
            console.log(asset, 'asdfd');
            const muxData = await this.prisma.muxData.create({
                data: {
                    chapterId: chapterId,
                    assetId: asset.id,
                    playbackId: (_b = (_a = asset.playback_ids) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id,
                },
            });
            return muxData;
        }
        catch (error) {
            throw new Error(`Error uploading to Mux: ${error}`);
        }
    }
};
MuxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MuxService);
exports.MuxService = MuxService;
//# sourceMappingURL=mux.service.js.map