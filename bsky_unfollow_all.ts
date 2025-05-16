/// <reference types="bun-types" />
import { Agent, CredentialSession } from '@atproto/api'

const BSKY_URL  = 'https://bsky.social'
if (process.argv.length < 4) {
    console.error('Usage: bun remove_all_followers.ts --identifier <identifier> --password <password>')
    process.exit(1)
}

// Parse command line arguments
const args = process.argv.slice(2)
const identifier = args[args.indexOf('--identifier') + 1]
const password = args[args.indexOf('--password') + 1]

if (!identifier || !password) {
    console.error('Please provide both --identifier and --password arguments')
    process.exit(1)
}

const session = new CredentialSession(
    new URL(BSKY_URL),
)

console.log(`Logging into ${BSKY_URL} as ${identifier}...`)
await session.login({
    identifier,
    password,
})

const agent = new Agent(session)

let cursor: string | undefined;
const followers = await agent.getFollows({
    actor: identifier,
    limit: 100,

})

const deletions = followers.data.follows.map((f) => {
    console.log(`Deleting follower ${f.handle}`)
    return agent.deleteFollow(f.viewer?.following!)
})

await Promise.all(deletions)

cursor = followers.data.cursor
while (cursor) {
    const followers = await agent.getFollows({
        actor: identifier,
        limit: 100,
        cursor,
    })

    const deletions = followers.data.follows.map((f) => {
        console.log(`Deleting follower ${f.handle}`)
        return agent.deleteFollow(f.viewer?.following!)
    })

    await Promise.all(deletions)

    cursor = followers.data.cursor
}

console.log('Deleted all followers')
