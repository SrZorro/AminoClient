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
import AminoClient from "aminoclient";

(async () => {
    const auth = await AminoClient.login("**USERNAME**", "**PASSWORD**", "**DEVICEID**");
    console.log(`Your nickname is : ${auth.account.nickname}`);
    
    const joinedComms = await AminoClient.getJoinedCommunities(0, 5);
    console.log(`You are joined to ${joinedComms.communityList.length} communities.`);

    for (const community of joinedComms.communityList) {
        console.log(`Community ${community.name} contains ${community.membersCount} members.`);
        try {
            await AminoClient.checkIn(community.ndcId);
        } catch(e) {
            console.log("You alread checkedIn in this community");
        }
    }
})();
```

You can explore the rest of the API using this module with TypeScript meanwhile the documentation is WIP.