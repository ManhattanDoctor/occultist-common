
import { Exclude, Expose, Type } from 'class-transformer';

export enum AiConversationMessageRole {
    USER = 'USER',
    ASSISTANT = 'ASSISTANT',
}

@Exclude()
export class AiConversationMessage {
    @Expose()
    public id: number;
    @Expose()
    public role: AiConversationMessageRole;
    @Expose()
    public text?: string;

    @Expose()
    @Type(() => Date)
    public createdDate: Date;
}