module.exports = () => {
    return {
        ROOT_API: {
            AUTH: '/api/user'
        },
        USER: {
            CREATE_USER: '/create-user',
            SEND_MAIL_REGISTER: '/send-mail-register',
            UPDATE_PROFILE: '/update-profile',
            GET_TOKEN_FOR_REGISTER: '/get-token-for-register',
            CHANGE_AVATAR: '/change-avatar',
            UPDATE_POINT: '/update-point',
            LOGIN: '/login',
            SEND_EMAIL_CODE: '/send-email-code',
            CHANGE_PASSWORD: '/change-password',
            FORGOT_PASSWORD: '/forgot-password'
        }
    }
}