import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateChapterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;
}
