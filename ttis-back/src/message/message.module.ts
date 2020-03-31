import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageResolver } from "./message.resolver";
import { Message } from "./message";

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  exports: [TypeOrmModule],
  providers: [MessageResolver]
})
export class MessageModule {
}
