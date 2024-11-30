"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("src/prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const crypto = __importStar(require("crypto"));
const sendEmail_1 = __importDefault(require("src/common/sendEmail"));
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { email, password } = registerDto;
        const validateEmail = (email) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        };
        if (!validateEmail(email)) {
            throw new common_1.HttpException(`The email address '${email}' is invalid. Please provide a valid email address.`, common_1.HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.HttpException('Email already in use', common_1.HttpStatus.BAD_REQUEST);
        }
        const token = crypto.randomBytes(32).toString('hex');
        const tokenExpiration = new Date(new Date().getTime() + 30 * 24 * 60 * 60000);
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    userType: 'STUDENT',
                    resetToken: token,
                    resetTokenExpiry: tokenExpiration,
                },
            });
            const activationLink = `${process.env.BASE_URL}/auth/activate/${token}`;
            (0, sendEmail_1.default)(email, 'Email confirmation', activationLink);
            return {
                message: 'User registered successfully! Please check your email to activate your account.',
                status: 'success',
                user,
            };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.HttpException('Email already in use', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            throw new Error('Internal server error');
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const payload = {
            id: user.id,
            email: user.email,
            userId: user.id,
            role: user.role,
            type: user.userType,
        };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async activateAccount(token) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    not: null,
                },
            },
        });
        if (!user || !user.resetTokenExpiry) {
            throw new common_1.HttpException({
                message: 'Invalid or expired token',
                status: 'error',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const now = new Date();
        if (now > user.resetTokenExpiry) {
            throw new common_1.HttpException({
                message: 'Token expired, please request a new one.',
                status: 'error',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        return {
            message: 'Account activated successfully! You can now log in.',
            status: 'success',
        };
    }
    async getUserById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            return { hasPassword: user.password ? true : false };
        }
        catch (error) {
            throw new common_1.HttpException('Server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map