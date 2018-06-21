export interface IBaseAPI {
    "api:duration": string;
    "api:message": string;
    "api:timestamp": string;
    "api:statuscode": number;
}

export interface ILoginResponse extends IBaseAPI {
    account: IAminoAccount;
    secret: string;
    sid: string;
}

export interface IAminoAccount {
    status: number;
    uid: string;
    phoneNumberActivation: number;
    emailActivation: number;
    facebookID: null | string;
    mediaList: null | any;
    dateOfBirth: null | string;
    role: number;
    latitude: null | any;
    phoneNumber: null | any;
    email: string;
    username: null;
    modifiedTime: string;
    twitterID: null;
    activation: 1;
    membership: null;
    address: null;
    nickname: string;
    googleID: null;
    icon: string;
    securityLevel: number;
    gender: null;
    longitude: null;
    createdTime: string;
}

export interface IWallet extends IBaseAPI {
    wallet: {
        totalCoins: number
    };
}

export interface IOnlineMembers extends IBaseAPI {
    userProfileCount: number;
    userProfileList: IUserProfile[];
}

export interface IAffiliations extends IBaseAPI {
    affiliations: string[];
}

export interface ICheckIn extends IBaseAPI {
    additionalReputationPoint?: number;
    canPlayLottery?: boolean;
    consecutiveCheckInDays?: number;
    earnedReputationPoint?: number;
    userProfile?: ICheckInUserProfile;
}

export interface ICheckInUserProfile {
    ccountMembershipStatus: number;
    icon: string;
    level: number;
    nickname: string;
    reputation: number;
    role: number;
    status: number;
    uid: string;
}

export interface IJoinedCommunitiesInfo {
    communityList: IAminoCommunity[];
    userInfoInCommunities: { [key: string]: IUserProfile };
}

export interface IUserProfile {
    status: number;
    moodSticker: any;
    itemsCount: number;
    consecutiveCheckInDays: any;
    uid: string;
    modifiedTime: string;
    joinedCount: number;
    onlineStatus: number;
    accountMembershipStatus: number;
    createdTime: string;
    longitude: null | number;
    race: null | string;
    address: null | string;
    membersCount: number;
    nickname: string;
    mediaList: any;
    icon: string;
    mood: null | string;
    level: number;
    gender: null | string;
    age: null | any;
    settings: { onlineStatus: number };
    pushEnabled: boolean;
    membershipStatus: number;
    content: null | string;
    reputation: number;
    role: number;
    latitude: null | number;
    extensions: null | any;
    blogsCount: number;
}

export interface IAminoCommunity {
    status: number;
    launchPage: {
        mediaList: Array<Array<number | string | null | string>>,
        title: string
    };
    endpoint: string;
    name: string;
    modifiedTime: string;
    communityHeat: number;
    tagline: string;
    templateId: number;
    agent: object;
    joinType: number;
    link: string;
    listedStatus: number;
    themePack: object;
    ndcId: number;
    createdTime: string;
    probationStatus: number;
    membersCount: number;
    primaryLanguage: string;
    promotionalMediaList: Array<number | string | null>;
    icon: string;
}

export interface IAminoThread {
    uid: string;
    membersQuota: number;
    membersSummary: IMiniUserProfile[];
    threadId: string;
    keywords: string;
    membersCount: number;
    title: string;
    membershipStatus: number;
    content: string;
    latitude?: number;
    alertOption: number;
    lastReadTime?: Date;
    type: number;
    status: number;
    modifiedTime?: Date;
    lastMessageSummary?: any;
    condition: number;
    icon: string;
    latestActivityTime?: Date;
    longitude?: number;
    extensions?: any;
    createdTime?: Date;
}

export interface IMiniUserProfile {
    status: number;
    uid: string;
    level: number;
    onlineStatus: number;
    reputation: number;
    role: number;
    nickname: string;
    icon: string;
}

export interface IPublicChats {
    threadList: IAminoThread[];
    recommendedThreadList: IAminoThread[];
}

export interface IAminoMessage {
    author: IMiniUserProfile;
    threadId: string;
    mediaType: number;
    content?: string;
    mediaValue?: string;
    clientRefId: string;
    messageId: string;
    createdTime: Date;
    type: number;
}