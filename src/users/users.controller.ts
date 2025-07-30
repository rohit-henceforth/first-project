import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('')
  findOne(@Param('id') id : string){
    return this.usersService.findOne(Number(id));
  }

  @Get('filter')
  filter(@Query() query : {name? : string, email? : string, role? : "admin" | "customer", age? : string}) {
    return this.usersService.filter(query);
  }


  @Get('sort/:sortBy')
  sort(@Param('sortBy') sortBy : "createdAt" | "age" | "name" | "email") {
    return this.usersService.sort(sortBy);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Put(':id')
  change(@Param('id') id: string, @Body() changeUserDto: ChangeUserDto) {
    return this.usersService.change(Number(id), changeUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id : number){
    return this.usersService.remove(Number(id));
  }
  
}
