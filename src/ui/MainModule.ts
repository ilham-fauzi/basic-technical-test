import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GreatCommonDevisorController } from './controllers/GreatCommonDevisorController';
import { SoccerController } from './controllers/SoccerController';
import { Provider } from './providers/Provider';

@Module({
    imports: [CqrsModule],
    controllers: [SoccerController, GreatCommonDevisorController],
    providers: Provider,
    exports: Provider,
})

export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // throw new Error('Method not implemented.');
    }
}
