export const ChatSocketEnum = Object.freeze({
    // ? once user is ready to go
    CONNECTED_EVENT: "CONNECTED",
    // ? when user gets disconnected
    DISCONNECT_EVENT: "DISCONNECTED",
    // ? when user joins a socket room
    JOIN_CHAT_EVENT: "CHAT_JOINED",
    // ? when participant gets removed from group, chat gets deleted or leaves a group
    LEAVE_CHAT_EVENT: "LEAVE_CHAT",
    // ? when admin updates a group name
    UPDATE_GROUP_NAME_EVENT: "UPDATE_GRP_NAME",
    // ? when new message is received
    MESSAGE_RECEIVED_EVENT: "MSG_RECEIVED",
    // ? when there is new one on one chat, new group chat or user gets added in the group
    NEW_CHAT_EVENT: "NEW_CHAT",
    // ? when there is an error in socket
    SOCKET_ERROR_EVENT: "SOCKET_ERROR",
    // ? when participant stops typing
    STOP_TYPING_EVENT: "STOP_TYPING",
    // ? when participant starts typing
    TYPING_EVENT: "TYPING",
    // ? when message is deleted
    MESSAGE_DELETE_EVENT: "MESSAGE_DELETED",
})