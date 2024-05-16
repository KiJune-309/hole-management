import {info} from "sass";

export interface ClerkItem {
    id: string
    clerkId: string
    clerkName: string
    phone: string
    sex:0|1
    level:string
    wxNumber:string
    createTime: string
    status: 0|1
}

export interface ClerkInfo{
    "id": number,
    "clerkId":string,
    "clerkName": string,
    "openId":string
    "age": number,
    "sex": 1|0,
    "position": string,
    "label": string,
    "motto": string,
    "level": string,
    "onlineStatus": number,
    "avatar": string,
    "voicePath": string,
    "carousels": carousels,
    "labels": labels,
    "isDelete": 1|0,
    "createTime": string,
    "updateTime": string,
}


export interface labels{
    [index:number]:string
}

export interface carousels{
    [index:number]: {
        "id": number,
        "clerkId": string,
        "imagePath": string,
        "createTime": string,
        "updateTime":string,
        "isDelete": 1|0
    },
}

