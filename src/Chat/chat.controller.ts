import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getChats(@Query('userId') userId: string) {
    return this.chatService.getChats(userId);
  }

  @Post()
  async createChat(
    @Body() chatData: { user: string; messages: any[]; title: string },
  ) {
    return this.chatService.createChat(chatData);
  }

  @Put()
  async updateChat(
    @Body() updateData: { chatId: string; messagesArray: any[] },
  ) {
    return this.chatService.updateChat(updateData);
  }

  @Delete()
  async deleteChat(@Body() { chatId }: { chatId: string }) {
    return this.chatService.deleteChat(chatId);
  }
}
