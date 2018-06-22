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

export interface ICommunityInfo extends IBaseAPI {
    community: IAminoCommunityComplex;
    currentUserInfo: {
        notificationsCount: number;
        unreadChatThreadsCount: number;
        userProfile: IUserProfile;
    };
    isCurrentUserJoined: boolean;
}

export interface IJoinedCommunitiesInfo {
    communityList: IAminoCommunitySimple[];
    userInfoInCommunities: { [key: string]: IUserProfile };
}

export interface IUserProfile {
    accountMembershipStatus: number;
    address: string | null;
    age: number | null;
    blogsCount: number;
    consecutiveCheckInDays: number | null;
    content: string | null;
    createdTime: string;
    extensions: object | null;
    gender: string | null;
    icon: string;
    itemsCount: number;
    joinedCount: number;
    latitude: number | null;
    level: number;
    longitude: number | null;
    mediaList: any | null;
    membersCount: number;
    membershipStatus: number;
    modifiedTime: string;
    mood: null | string;
    moodSticker: any | null;
    nickname: string;
    onlineStatus: number;
    pushEnabled: boolean;
    race: string | null;
    reputation: number;
    role: number;
    settings: { onlineStatus: number };
    status: number;
    uid: string;
}

export interface IAminoCommunityBase {
    communityHeat: number;
    createdTime: string;
    endpoint: string;
    icon: string;
    joinType: number;
    link: string;
    membersCount: number;
    modifiedTime: string;
    name: string;
    ndcId: number;
    primaryLanguage: string;
    probationStatus: number;
    promotionalMediaList: Array<Array<number | string | null>>;
    status: number;
    tagline: string;
    templateId: number;
    themePack: {
        themeColor: string;
        themePackHash: string;
        themePackRevision: number;
        themePackUrl: string;
    };
}

export interface IAminoCommunitySimple extends IAminoCommunityBase {
    agent: {
        accountMembershipStatus: number;
    } & IMiniUserProfileNullable;
    launchPage: {
        mediaList: Array<Array<number | string | (string | null) | string>>;
        title: string;
    };
    listedStatus: number;
}

export interface IAminoCommunityComplex extends IAminoCommunityBase {
    advancedSettings: object;
    agent: {
        accountMembershipStatus: number;
    } & IMiniUserProfile;
    communityHeadList: {
        accountMembershipStatus: number;
    } & IMiniUserProfile[];
    communityTagList: Array<{ name: string, voteCount: number }>;
    configuration: object; // ToDo
    general: {
        accountMembershipEnabled: boolean;
        avatarEnabled: boolean;
        disableLiveLayerActive: boolean;
        disableLiveLayerVisible: boolean;
        facebookAppIdList: string[];
        hasPendingReviewRequest: boolean;
        joinTypeLock: number[];
        joinedBaselineCollectionIdList: string[];
        onlyAllowOfficialTag: boolean;
        premiumFeatureEnabled: boolean;
        wellcomeMessage: {
            enabled: boolean;
            text: string | null;
        };
        mediaList: Array<Array<number | string | (string | null) | string>>;

    };
    module: object; // ToDo
    page: object; // ToDo
    content: string;
    extensions: object; // ToDo
    isStandaloneAppMonetizationEnabled: boolean;
    keywords: string;
    listedStatus: number;
    mediaList: Array<Array<number | string | (string | null) | string>>;
    searchable: boolean;
}

export interface IAminoThread {
    alertOption: number;
    author: {
        accountMembershipStatus: number;
    } & IMiniUserProfile;
    condition: number;
    content: string | null;
    extensions: {
        bannedMemberUidList: string[];
        bm: Array<number | string | (null | undefined)>;
        channelType?: number;
        lastMembersSummaryUpdateTime: number;
    };
    icon: string;
    isPinned?: boolean;
    keywords: string | null;
    lastMessageSummary: IAminoMiniMessage;
    lastReadTime: string | null;
    latestActivityTime: string | null;
    latitude: number | null;
    longitude: number | null;
    membersCount: number;
    membersQuota: number;
    membersSummary: {
        membershipStatus: number;
    } & IMiniUserProfile[];
    membershipStatus: number;
    modifiedTime: string;
    status: number;
    threadId: string;
    title: string;
    type: number;
    uid: string;
}

export interface IMiniUserProfile {
    icon: string;
    level: number;
    nickname: string;
    reputation: number;
    role: number;
    status: number;
    uid: string;
}

export interface IMiniUserProfileNullable {
    icon: string | null;
    level: number;
    nickname: string | null;
    reputation: number;
    role: number | null;
    status: number | null;
    uid: string;
}


export interface IPublicChats {
    threadList: IAminoThread[];
    recommendedThreadList: IAminoThread[];
}

export interface IAminoMiniMessage {
    content: string | null;
    createdTime: string;
    mediaType: number;
    mediaValue: string | null;
    messageId: string;
    type: number;
    uid: string;
}

export interface IAminoMessage extends IAminoMiniMessage {
    author: {
        accountMembershipStatus: number;
    } & IMiniUserProfile;
    chatBubbleId?: string;
    chatBubbleVersion?: number;
    clientRefId: string;
    extensions: object;
    threadId: string;
}