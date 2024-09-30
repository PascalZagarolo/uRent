import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv"

const ratelimit = new Ratelimit({
    redis : kv,
    limiter : Ratelimit.slidingWindow(5, "10s"),
})

export const config = {
    runtime : 'edge'
}

export default async function handler(request : NextRequest) {
    const ip = request.ip ?? '127.0.0.1'

    const { limit, reset, remaining } = await ratelimit.limit(ip)

    if(remaining === 0) {
        return new Response(JSON.stringify({ error : 'Rate limit exceeded' }), {
            status : 429,
            headers : {
                'X-RateLimit-Limit' : limit.toString(),
                'X-RateLimit-Remaining' : remaining.toString(),
                'X-RateLimit-Reset' : reset.toString()
            }
        })
    }

}