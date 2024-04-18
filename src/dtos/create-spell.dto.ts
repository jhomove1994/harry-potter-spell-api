import { IsBoolean, IsIn, IsNotEmpty, IsString } from "class-validator";
import { LIGHT } from "./query-filter-spells.dto";

export class CreateSpellDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  incantation: string;

  @IsString()
  @IsNotEmpty()
  effect: string;

  @IsBoolean()
  @IsNotEmpty()
  canBeVerbal: boolean;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Blue', 'Red'])
  light: LIGHT;
}
