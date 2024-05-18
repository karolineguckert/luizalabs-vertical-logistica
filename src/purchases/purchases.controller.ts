import { Controller, Get } from '@nestjs/common';

@Controller('purchases')
export class PurchasesController {
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }
}