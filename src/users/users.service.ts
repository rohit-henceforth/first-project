import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { stat } from 'fs';

@Injectable()
export class UsersService {
  private users: any[] = [];
  findAll() {
    return {
      message: "Users Fetched Successfully",
      data: this.users,
      status : 200
    };
  }

  create(dto: CreateUserDto) {
    const newUser = { id: Date.now(), ...dto };
    this.users.push(newUser);
    return {
      message: "User created successfully",
      data: newUser,
      status : 201
    };
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return {
        message: "User not found",
        data: null,
        status: 404
      }
    }

    return {
      message: "User fetched successfully",
      data: user,
      status: 200
    }
  }

  update(id:number, dto : UpdateUserDto){
    
    const user = this.users.find(user => user.id === id);

    if(!user) {
      return {
        message: "User not found",
        data: null,
        status: 404
      }
    }

    this.users = this.users.map(user=>{
      if(user.id === id){
        return {
          ...user,
          ...dto
        }
      }
      return user ;
    })

    const userAfterUpdate = this.users.find(user => user.id === id)

    return {
      message: "User updated successfully",
      data: userAfterUpdate,
      status: 200
    }

  }

  change(dto: ChangeUserDto) {
    
  }
}
