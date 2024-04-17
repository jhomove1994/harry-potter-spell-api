import { IsIn, IsOptional, IsString } from 'class-validator'

export type LIGHT = "Blue" | "Red";

export class QueryFilterSpellsDTO {
  @IsString()
  Type?: string;

  @IsOptional()
  @IsString()
  @IsIn(['blue', 'red'])
  light?: LIGHT;
}
