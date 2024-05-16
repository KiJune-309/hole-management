import * as Clerk from "./type"
import http from "@/utils/http"
import {prefix} from "@/apis/config"
import type {ClerkDetail, ClerkInfo} from "./type";
/** @dec 获取店员列表*/
export function getClerkList(data:{current:number;pageSize:number}){
    return http.get<PageRes<Clerk.ClerkItem>>(`${prefix}/holeClerk/getClerkByPage/${data.current}/${data.pageSize}`);
}

/** @dec 获取申请店员列表*/
export function getClerkApplyList({current,pageSize}:{current:number;pageSize:number}){
    return http.get<PageRes<Clerk.ClerkItem>>(`${prefix}/holeClerk/wait/check/${current}/${pageSize}`);
}

/** @dec获取店员详细信息*/
export function getClerkDetailInfo({clerkId}:{clerkId:string}){
    return http.get<PageRes<Clerk.ClerkInfo>>(`${prefix}/holeClerk/clerkInfo/${clerkId}`);
}


/** @dec 设置店员上下价*/
export function setClerkStatus({clerkId}:{clerk:string}){
    return http.get(`/holeClerk/hit/shelf/${clerkId}`);
}


