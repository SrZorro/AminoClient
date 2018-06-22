import fetch from "cross-fetch";
import Endpoints from "./Endpoints";
import { v4 as UUID } from "uuid";
import * as AminoTypes from "./AminoTypes";

interface Iheaders { [key: string]: string; }

class AminoClient {
    public isLogged: boolean;
    public onLogged: Array<() => void>;
    public uid: string;
    private sid: string;
    private deviceId: string;
    constructor() {
        this.uid = "";
        this.sid = "";
        this.deviceId = "";
        this.isLogged = false;
        this.onLogged = [];
    }

    public async login(email: string, password: string, deviceId: string): Promise<AminoTypes.ILoginResponse> {
        this.deviceId = deviceId;
        const body = {
            email,
            secret: `0 ${password}`,
            deviceID: deviceId,
            clientType: 100,
            action: "normal",
            timestamp: Math.round((new Date()).getTime() / 1000)
        };

        const result = await this.post(Endpoints.LOGIN, body, {
            "NDCDEVICEID": this.deviceId,
            "NDC-MSG-SIG": this.getMessageSignature()
        });

        const statusCode: number = result["api:statuscode"];

        switch (statusCode) {
            case 0: break;
            default:
                if (!result["api:statuscode"])
                    throw Error("Unknown error");
                const err = new Error(result["api:message"]);
                err.name = result["api:statuscode"];
                throw err;
        }

        this.sid = result.sid;
        this.uid = result.account.uid;

        this.isLogged = true;
        this.onLogged.map((onLogged) => {
            onLogged();
        });
        return result;
    }

    public async getWallet(): Promise<AminoTypes.IWallet> {
        return await this.get(Endpoints.WALLET);
    }

    public async getJoinedCommunities(start: number, size: number): Promise<AminoTypes.IJoinedCommunitiesInfo> {
        return await this.get(Endpoints.JOINED_COMMUNITIES(start, size));
    }

    public async getCommunities(languageCode: string, start: number, size: number): Promise<any> {
        return await this.get(Endpoints.COMMUNITY_COLLECTION_SECTIONS(languageCode, start, size));
    }

    public async getAffiliations(): Promise<AminoTypes.IAffiliations> {
        return await this.get(Endpoints.AFFILIATIONS);
    }

    public async getHeadlines(start: number, size: number): Promise<any> {
        return await this.get(Endpoints.HEADLINES(start, size));
    }

    // ===[ COMMUNITY INTERACTION ]===
    public async checkIn(ndcId: number): Promise<AminoTypes.ICheckIn> {
        return await this.post(Endpoints.COMMUNITY_CHECK_IN(ndcId), {
            timestamp: Math.round(new Date().getTime() / 1000),
            timezone: 0
        }, {
                "NDCDEVICEID": this.deviceId,
                "NDCAUTH": `sid=${this.sid}`,
                "NDC-MSG-SIG": this.getMessageSignature()
            });
    }

    // Don't know what this is
    public async getLinkIdentify(q: string) {
        return await this.get(Endpoints.LINK_IDENTIFY(q));
    }

    public async getPublicChats(ndcId: number, start: number, size: number): Promise<AminoTypes.IAminoThread[]> {
        const response = await this.get(Endpoints.LIVE_LAYERS_PUBLIC_CHAT(ndcId, start, size));
        return response.threadList;
    }

    public async joinCommunity(ndcId: number): Promise<any> {
        return await this.get(Endpoints.JOIN_COMMUNITY(ndcId));
    }

    public async leaveCommunity(ndcId: number): Promise<any> {
        return await this.get(Endpoints.LEAVE_COMMUNITY(ndcId));
    }

    public async getCommunityInfo(ndcId: number): Promise<AminoTypes.IAminoCommunityComplex> {
        return await this.get(Endpoints.COMMUNITY_INFO(ndcId));
    }

    public async getJoinedChats(ndcId: number, start: number, size: number): Promise<AminoTypes.IAminoThread[]> {
        const response = await this.get(Endpoints.COMMUNITY_CHAT_THREAD(ndcId, "joined-me", start, size));
        return response.threadList;
    }

    public async getOnlineMembers(ndcId: number, start: number, size: number): Promise<AminoTypes.IOnlineMembers> {
        return await this.get(Endpoints.COMMUNITY_ONLINE_MEMBERS(ndcId, start, size));
    }

    // ===[ THREAD INTERACTION ]===
    public async leaveThread(ndcId: number, threadId: string, uid: string): Promise<any> {
        return await this.delete(Endpoints.COMMUNITY_CHAT_JOIN_LEAVE(ndcId, threadId, uid));
    }

    public async joinThread(ndcId: number, threadId: string, uid: string): Promise<any> {
        return await this.post(Endpoints.COMMUNITY_CHAT_JOIN_LEAVE(ndcId, threadId, uid), {});
    }

    public async getThreadMessages(ndcId: number, threadId: string, start: number, size: number, startTime?: string): Promise<AminoTypes.IAminoMessage[]> {
        let url = "";
        if (startTime === undefined) {
            url = Endpoints.COMMUNITY_CHAT_GET_MESSAGES(ndcId, threadId, start, size);
        } else {
            url = Endpoints.COMMUNITY_CHAT_GET_MESSAGES_SINCE(ndcId, threadId, start, size, startTime);
        }
        const result = await this.get(url);
        return result.messageList;
    }

    public async sendMessageInThread(ndcId: number, threadId: string, content: string): Promise<AminoTypes.IAminoMessage> {
        const msg = await this.post(Endpoints.COMMUNITY_CHAT_SEND_MESSAGE(ndcId, threadId), {
            attachedObject: null,
            content,
            type: 0,
            clientRefId: Math.round((new Date()).getTime() / 1000),
            timestamp: Math.round((new Date()).getTime() / 1000)
        }, {
                "NDCDEVICEID": this.deviceId,
                "NDCAUTH": `sid=${this.sid}`,
                "NDC-MSG-SIG": this.getMessageSignature()
            });
        return msg;
    }

    public async sendMediaInThread(ndcId: number, threadId: string, content: string, mediaType: string, mediaB64?: string): Promise<AminoTypes.IAminoMessage> {
        const body = {
            type: mediaType.includes("audio") ? 2 : 0,
            clientRefId: Math.round((new Date()).getTime() / 1000),
            mediaType: mediaType.includes("audio") ? 110 : 100,
            content,
            // @ts-ignore
            attachedObject: null,
            timestamp: Math.round((new Date()).getTime() / 1000)
        };
        if (mediaB64)
            //@ts-ignore
            body.mediaUploadValue = mediaB64;

        // Note: PNG support is kinda wroken, its converted to jpg and creates artefacts where transparency was located.
        if (mediaType.includes("image")) {
            // @ts-ignore
            body.mediaUhqEnabled = false; // High quality maybe?
            // @ts-ignore
            body.mediaUploadValueContentType = mediaType;
        }

        const msg = await this.post(Endpoints.COMMUNITY_CHAT_SEND_MESSAGE(ndcId, threadId), body, {
            NDCDEVICEID: this.deviceId,
            NDCAUTH: `sid=${this.sid}`
        });
        return msg;
    }

    // ===[ HELPERS ]===
    private async get(url: string) {
        const headers: Iheaders = {
            "NDCDEVICEID": this.deviceId,
            "NDCAUTH": `sid=${this.sid}`,
            "NDC-MSG-SIG": this.getMessageSignature(),
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 7.1.2; MotoG3-TE Build/NJH47F; com.narvii.amino.master/1.8.15305)",
            "Upgrade": "websocket",
            "Connection": "Upgrade",
            "Sec-WebSocket-Key": "86iFBnuI8GWLlgWmSToY6g==",
            "Sec-WebSocket-Version": "13",
            "Accept-Encoding": "gzip"
        };
        const response = await fetch(url, { method: "GET", headers });
        return await response.json();
    }

    private async post(url: string, body: object, headers?: Iheaders) {
        const defaultHeaders: Iheaders = {
            NDCDEVICEID: this.deviceId,
            NDCAUTH: `sid=${this.sid}`
        };
        const response = await fetch(url, { method: "POST", headers: headers ? headers : defaultHeaders, body: JSON.stringify(body) });
        const json = await response.json();
        return { ...json, response };
    }

    private async delete(url: string, headers?: Iheaders) {
        const defaultHeaders: Iheaders = {
            NDCDEVICEID: this.deviceId,
            NDCAUTH: `sid=${this.sid}`
        };
        const response = await fetch(url, { method: "DELETE", headers: headers ? headers : defaultHeaders });
        const json = await response.json();
        return { ...json, response };
    }

    private getMessageSignature(): string {
        return UUID().replace("-", "").toUpperCase().substring(0, 27);
    }
}

export default AminoClient;