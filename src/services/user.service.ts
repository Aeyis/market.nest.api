import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { LoginFormDto } from '../dto/auth.form.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async create(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const existing = await this._userRepo.findOne({
      where: { username: user.username },
    });
    if (existing) {
      throw new Error('User already exists');
    }

    user.password = bcrypt.hashSync(user.password, 10);

    return await this._userRepo.save(user);
  }

  async login(credential: LoginFormDto): Promise<UserEntity> {
    const user = await this._userRepo.findOne({
      where: { username: credential.username },
    });
    if (!user) {
      throw new Error('Credential Invalid');
    }
    if (!bcrypt.compareSync(credential.password, user.password)) {
      throw new Error('Credential Invalid');
    }

    return user;
  }
}
