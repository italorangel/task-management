import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TasksStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TasksStatus.OPEN,
        TasksStatus.IN_PROGRESS,
        TasksStatus.DONE
    ];
    
    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(` ${value} is a invalid status`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);

        return index !== -1;
    }
}