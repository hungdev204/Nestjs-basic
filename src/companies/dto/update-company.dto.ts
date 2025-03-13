import { IsEmail, IsNotEmpty } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateCompanyDto {
  _id: string;

  @IsNotEmpty({ message: 'Name khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'Address khong duoc de trong' })
  address: string;

  @IsNotEmpty({ message: 'Description khong duoc de trong' })
  description: string;
}