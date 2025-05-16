# Bsky Unfollow All

Followed too many people on Bluesky using the starter packs? Want a fresh start? Look no further~

# Fastest way
Here is a hosted version of the script on Val Town: [https://www.val.town/x/kklee998/bsky-unfollow-all](https://www.val.town/x/kklee998/bsky-unfollow-all)

Alternatively, if you have Docker:

```bash
docker run --rm ghcr.io/kklee998/bsky-unfollow-all --identifier your-handle.bsky.social --password your-app-password
```

# Getting started

1. Get yourself an App Password: [https://bsky.app/settings/app-passwords](https://bsky.app/settings/app-passwords). P/S: This method of auth will be deprecated eventually.
1. Clone this repo.
1. Download `bun`. If you have `mise`, use `mise i` command to install it for this repo.
1. `bun run bsky_unfollow_all.ts --identifier your-handle.bsky.social --password your-app-password`

# Using docker
```bash
docker build -t bsky-unfollow-all
docker run --rm bsky-unfollow-all --identifier your-handle.bsky.social --password your-app-password
```