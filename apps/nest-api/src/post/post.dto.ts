import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}

export class UpdatePostDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc: string;
}
