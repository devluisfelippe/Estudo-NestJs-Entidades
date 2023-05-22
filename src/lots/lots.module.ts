import { Module } from "@nestjs/common";
import { LotService } from "./lots.service";
import { LotController } from "./lots.controller";


@Module({
    controllers: [LotController],
    providers: [LotService],
})
export class LotsModule {}