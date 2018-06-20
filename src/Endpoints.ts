const prefix = "http://service.narvii.com/api/v1";
export default {
    // // ===[ AUTH ENDPOINTS ]===
    LOGIN: prefix + "/g/s/auth/login",

    // ===[ USER ENDPOINTS ]===
    AFFILIATIONS: prefix + "/g/s/account/affiliations?type=active",
    HEADLINES: (start: number, size: number) => `${prefix}/g/s/feed/headlines?start=${start}&size=${size}`,

    // ===[ COMMUNITY ENDPOINTS ]===
    LINK_IDENTIFY: (q: string) => `${prefix}/g/s/community/link-identify?q={0}`,
    JOIN_COMMUNITY: (ndcId: number) => `${prefix}/${ndcId}/s/community/join`,
    LEAVE_COMMUNITY: (ndcId: number) => `${prefix}/${ndcId}/s/community/leave`,
    COMMUNITY_INFO: (ndcId: number) => `${prefix}/g/s-x${ndcId}/community/info`,
    JOINED_COMMUNITIES: (start: number, size: number) => `${prefix}/g/s/community/joined?start=${start}&size=${size}`,
    COMMUNITY_COLLECTION_SECTIONS: (language: string, start: number, size: number) => `${prefix}/g/s/community-collection/view/explore/sections?language=${language}&start=${start}&size=${size}`,
    COMMUNITY_CHECK_IN: (ndcId: number) => `${prefix}/x${ndcId}/s/check-in`,

    // ===[ CHAT ENDPOINTS ]===
    COMMUNITY_CHAT_THREAD: (ndcId: number, type: string, start: number, size: number) => `${prefix}/x${ndcId}/s/chat/thread?type=${type}&start=${start}&size=${size}`,
    COMMUNITY_CHAT_SEND_MESSAGE: (ndcId: number, threadID: string) => `${prefix}/x${ndcId}/s/chat/thread/${threadID}/message`,
    COMMUNITY_CHAT_GET_MESSAGES: (ndcId: number, threadID: string, start: number, size: number) => `${prefix}/x${ndcId}/s/chat/thread/${threadID}/message?start=${start}&size=${size}`,
    COMMUNITY_CHAT_GET_MESSAGES_SINCE: (ndcId: number, threadID: string, start: number, size: number, startTime: string) => `${prefix}/x${ndcId}/s/chat/thread/${threadID}/message?start=${start}&size=${size}&starttime=${startTime}`,

    // ===[ LIVE LAYERS ]===
    LIVE_LAYERS_PUBLIC_CHAT: (ndcId: number, start: number, size: number) => `${prefix}/x${ndcId}/s/live-layer/public-chats?start=${start}&size=${size}`
};