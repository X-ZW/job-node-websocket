export function getRedirectPath({type, headPic}) {
    // 根据用户信息 返回跳转地址
    let url = (type === 'boss') ? '/boss' : '/genius'
    if(!headPic) {
        url += 'info'
    }
    return url
}

export function getChatId(userId, targeId) {
    return [userId, targeId].sort().join('_')
}