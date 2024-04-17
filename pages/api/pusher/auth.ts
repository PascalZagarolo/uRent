import { NextApiRequest, NextApiResponse } from "next";


import { pusherServer } from "../../../lib/pusher";
import { lucia, validateRequest } from "@/lib/lucia";




export default async function handler(
    request : NextApiRequest,
    response : NextApiResponse,
) {
    const {session, user } = await validateRequest();;

    if(!user){
        return response.status(401);
    }

    const socketId = request.body.socket_id;
    const channel = request.body.channel_name;
    const data = {
        user_id : user.id,
    }

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return response.send(authResponse);
}