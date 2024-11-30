import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getChats(userId: string) {
    if (!userId) {
      throw new Error('Unauthorized');
    }
    return this.prisma.chat.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createChat(chatData: { user: string; messages: any[]; title: string }) {
    const { user, messages, title } = chatData;
    if (!user) {
      throw new Error('Unauthorized');
    }
    return this.prisma.chat.create({
      data: {
        title,
        messages,
        user: {
          connect: { id: user },
        },
      },
    });
  }

  async updateChat(updateData: { chatId: string; messagesArray: any[] }) {
    const { chatId, messagesArray } = updateData;
    if (!chatId) {
      throw new Error('Unauthorized');
    }
    return this.prisma.chat.update({
      where: { id: chatId },
      data: { messages: messagesArray },
    });
  }

  async deleteChat(chatId: string) {
    if (!chatId) {
      throw new Error('Unauthorized');
    }
    return this.prisma.chat.delete({
      where: { id: chatId },
    });
  }
}
