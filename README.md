# AminoClient

Node.js module that wraps the Amino endpoints in easy to use library

## I want to use Amino in my PC, this is not what im looking for?

Nop, this is not what you are looking for, but maybe [AminoPC](https://github.com/SrZorro/AminoPC) it is.

## Installation
```sh
npm i -s aminoclient
yarn add aminoclient
```

## Example usage

```typescript
import AminoClient from "aminoclient"; //typescript / ES6 modules
const AminoClient = require("aminoclient").default; //javascript / commonjs


(async () => {
    const auth = await AminoClient.login("**USERNAME**", "**PASSWORD**", "**DEVICEID**");
    console.log(`Your nickname is : ${auth.account.nickname}`);
    
    const joinedComms = await AminoClient.getJoinedCommunities(0, 5);
    console.log(`You are joined to ${joinedComms.communityList.length} communities.`);

    for (const community of joinedComms.communityList) {
        console.log(`Community ${community.name} contains ${community.membersCount} members.`);
        const checkIn = await AminoClient.checkIn(community.ndcId);
        if(checkIn["api:statuscode"] !== 0)
            console.log("You already checked in in this community today!");
    }
})();
```

You can explore the rest of the API using this module with TypeScript meanwhile the documentation is WIP.

## DeviceID?

Take a look at my [AminoPC repo](https://github.com/SrZorro/AminoPC#not-so-easy) where I explain how to get one meanwhile the cool guys at [AminoREAPI](https://github.com/MrPowerGamerBR/AminoREAPI/issues/3) find a way to generate one from thin air.