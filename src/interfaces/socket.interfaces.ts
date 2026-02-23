
export interface OnlineUsersInterface {
    authenticated:Map<string,string>,
    guests:Set<string>
}
/** Online users list */
export const onlineUsers:OnlineUsersInterface = {
    authenticated:new Map(),
    guests:new Set()
};
