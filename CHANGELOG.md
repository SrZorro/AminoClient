# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Future]
- Keep investigating the API and add more methods.
- Add types to getCommunities.
- Add types to getHeadlines.
- Add types to joinCommunity.
- Add types to leaveCommunity.
- Add types to leaveThread.
- Add types to joinThread.

## [Unreleased]
### Added
- Added types to getCommunityInfo.
- Added getCommunityReminder method.

### Changed
- Refactored a bunch of interfaces.
- Interface types now are sorted so its easier to check for changes in the API.

## [1.0.6] - 2018-06-21
### Added
- getWallet.
- getOnlineMembers.
- leaveThread.
- joinThread.
- DELETE petition helper.
- This changelog.

### Changed
- CheckIn example in README.md follows the updated method.

### Fixed
- CheckIn now works, previous version was returning an error.