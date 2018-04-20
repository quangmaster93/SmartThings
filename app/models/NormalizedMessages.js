// @flow
import { Message } from "./Message";

export class NormalizedMessages {

    uid: string;

    sdid: string;

    startDate: number;

    endDate: number;

    count: number;

    order: string;

    size: number;

    prev: string;

    next: string;
    
    data: Array<Message>
}