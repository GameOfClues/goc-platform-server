import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { AdministrationModule } from './administration/administration.module';
import { LandingModule } from './landing/landing.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nikistoyanov:Niki_2005@cluster0.awj6joa.mongodb.net/goc-platform'),
    AuthModule,
    UsersModule,
    GamesModule,
    AdministrationModule,
    LandingModule
  ]
})
export class AppModule {}
