import { Module } from "@nestjs/common";
import { AccessController } from "./accessGroups.controller";
import { AccessService } from "./accessGroups.service";

@Module({
    controllers: [AccessController],
    providers: [AccessService],
})
export class AccessModule {}