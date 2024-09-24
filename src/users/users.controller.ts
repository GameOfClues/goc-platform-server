import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { UsersService } from './users.service';
import { UserDetailsDto } from "./dto/user-details.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/enums/role.enum";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   return this.catsService.create(createCatDto);
  // }
  //

  @Get()
  async findAll(): Promise<UserDetailsDto[]> {
    return await this.usersService.findAll();
  }

  @Get('profile')
  @ApiBearerAuth()
  @Roles(Role.User)
  async currentUser(@Request() req): Promise<UserDetailsDto> {
    return await this.usersService.findByEmail(req.user.email);

  }

}
