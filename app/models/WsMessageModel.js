// @flow
export default class WsMessageModel {
    // source device id
    sdid: string;

    // source device type id
    sdtid: string;

    // message id
    mid: string;

    // user id
    uid: string;

    // device data
    data: any;

    // time span
    ts: number;

    // c time span
    cts: number;
}