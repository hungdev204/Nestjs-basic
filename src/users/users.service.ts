import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUser: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUser.password);

    const user = await this.userModel.create({
      email: createUser.email,
      password: hashPassword,
      name: createUser.name,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid ID';
    }
    return this.userModel.findOne({ _id: id });
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  async update(UpdateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: UpdateUserDto._id },
      { ...UpdateUserDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid ID';
    }
    return this.userModel.deleteOne({ _id: id });
  }
}
