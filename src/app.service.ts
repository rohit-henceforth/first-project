import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name : string): string {
    console.log(name);
    const fullName = name?.split("_")?.map(word => word[0]?.toUpperCase() + word?.slice(1))?.join(" ");
    return `Hello ${fullName}!`;
  }
}