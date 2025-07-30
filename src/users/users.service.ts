import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';

@Injectable()
export class UsersService {
  private users: any[] = [];

  findAll() {
    return {
      message: "Users Fetched Successfully",
      data: this.users,
      status: 200
    };
  }

  create(dto: CreateUserDto) {
    const newUser = { id: Date.now(), ...dto };
    this.users.push(newUser);
    return {
      message: "User created successfully",
      data: newUser,
      status: 201
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

  update(id: number, dto: UpdateUserDto) {

    const user = this.users.find(user => user.id === id);

    if (!user) {
      return {
        message: "User not found",
        data: null,
        status: 404
      }
    }

    this.users = this.users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          ...dto
        }
      }
      return user;
    })

    const userAfterUpdate = this.users.find(user => user.id === id)

    return {
      message: "User updated successfully",
      data: userAfterUpdate,
      status: 200
    }

  }

  change(id: number, dto: ChangeUserDto) {

    const user = this.users.findIndex(user => user.id === id);

    if (user === -1) {
      return {
        message: "User not found",
        data: null,
        status: 404
      }
    }

    this.users[user] = {
      id,
      ...dto
    }

    return {
      message: "User changed successfully",
      data: this.users[user],
      status: 200
    }

  }

  remove(id: number) {
    const user = this.users.findIndex(user => user.id === id);
    if (user === -1) {
      return {
        message: "User not found",
        data: null,
        status: 404
      }
    }
    this.users.splice(user, 1);
    return {
      message: "User deleted successfully",
      data: null,
      status: 200
    }
  }

  filter(query: { name?: string, email?: string, role?: "admin" | "customer", age?: string }) {
    const filteredUsers = this.users.filter(user => {
      let match = true;
      if (query?.email) {
        match = match && user?.email === query?.email;
      }
      if (query?.name) {
        match = match && user?.name?.toLowerCase() === query?.name?.toLowerCase();
      }
      if (query?.role) {
        match = match && user?.role === query?.role;
      }
      if (query?.age) {
        match = match && user?.age == query?.age;
      }
      return match;
    });

    if (!filteredUsers || filteredUsers?.length === 0) {
      return {
        message: "No users found",
        data: null,
        status: 404
      }
    }

    return {
      message: "Users fetched successfully",
      data: filteredUsers,
      status: 200
    }
  }

  sort(sortBy: "createdAt" | "age" | "name" | "email") {

    const sortedUsers = [...this.users].sort((a, b) => {
      if (sortBy === "createdAt") {
        return a?.id - b?.id;
      }
      if (typeof a[sortBy] === "string" || typeof b[sortBy] === "string") {
        return a[sortBy].localeCompare(b[sortBy]);
      }
      if (a[sortBy] < b[sortBy]) {
        return -1;
      } else if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });

    return {
      message: "Users sorted successfully",
      data: sortedUsers,
      status: 200
    }

  }

  deleteSome(ids : number[]){
    this.users = this.users.filter(user => !ids.includes(user.id));
    return {
      message: "Users deleted successfully",
      data: null,
      status: 200
    }
  }
}