import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsIn,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";

class Location {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsObject()
  @IsNotEmpty()
  positions: {
    begin: {
      line: number;
    };
  };
}

class Metadata {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(["LOW", "MEDIUM", "HIGH"])
  severity: string;
}

class Finding {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  ruleId: string;

  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @ValidateNested()
  @Type(() => Metadata)
  metadata: Metadata;
}

export class CreateScanResultDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Finding)
  findings: Finding[];
}
