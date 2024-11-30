import { Injectable } from '@nestjs/common';
import Mux from '@mux/mux-node';
import { PrismaService } from 'src/prisma/prisma.service';

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;

const mux = new Mux({
  tokenId: MUX_TOKEN_ID,
  tokenSecret: MUX_TOKEN_SECRET,
});

const video = mux.video; // Easier reference for video operations

@Injectable()
export class MuxService {
  constructor(private readonly prisma: PrismaService) {}

  // Upload video to Mux and save video metadata to the database
  async uploadVideoToMux(videoUrl: string, chapterId: string) {
    try {
      const asset = await video.assets.create({
        input: [{ url: videoUrl }],
        playback_policy: ['public'],
        test: false, // Test mode
      });
      console.log(asset, 'asdfd');
      // Save Mux data to the database
      const muxData = await this.prisma.muxData.create({
        data: {
          chapterId: chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });

      return muxData; // Return the saved data for reference
    } catch (error: any) {
      throw new Error(`Error uploading to Mux: ${error}`);
    }
  }
}
