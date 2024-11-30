import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChats(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        messages: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    createChat(chatData: {
        user: string;
        messages: any[];
        title: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        messages: import("@prisma/client/runtime/library").JsonValue;
    }>;
    updateChat(updateData: {
        chatId: string;
        messagesArray: any[];
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        messages: import("@prisma/client/runtime/library").JsonValue;
    }>;
    deleteChat({ chatId }: {
        chatId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        messages: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
