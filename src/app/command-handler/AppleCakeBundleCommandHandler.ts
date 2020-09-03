import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppleCakeBundleBadrequest } from '../../app/exceptions/AppleCakeBundleBadrequest';
import { AppleCakeBundleCommand } from '../../app/command/AppleCakeBundleCommand';

@CommandHandler(AppleCakeBundleCommand)
export class AppleCakeBundleCommandHandler implements ICommandHandler {
    // tslint:disable-next-line: no-empty
    constructor() { }

  async execute(command: AppleCakeBundleCommand): Promise<{box: number, apple: number, cake: number}> {
    if (typeof command.apple !== 'number' || typeof command.cake !== 'number') { throw new AppleCakeBundleBadrequest(); }
    let boxNumber = Math.abs(command.apple);
    let cakeNumber = Math.abs(command.cake);
    while (cakeNumber) {
        const initial = cakeNumber;
        cakeNumber = boxNumber % cakeNumber;
        boxNumber = initial;
    }
    return {
        box: boxNumber,
        apple: command.apple / boxNumber,
        cake: command.cake / boxNumber,
    };
  }
}
