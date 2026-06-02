import { R2StorageService } from "@/infra/services/storage/r2-storage.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [R2StorageService],
    exports: [R2StorageService]
})
export class R2StorageModule { }