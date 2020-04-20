module.exports = () => {
    return {
        ROOT_API: {
            AUTH: '/api/users', // /api/user -> /api/users
            MAIN: '/api/main/:email',
            WORD: '/api/word',
            EXAMPLE: '/api/example',
            BADWORD: '/api/badword',
            RANK: '/api/rank'
        },
        USER: {
            CREATE_USER: '/', // /create-user -> /  note: Create a new user (method: post)
            SEND_MAIL_REGISTER: '/send-email-register', // note: send message to confirm (method: post)
            GET_USERS: '/',   // note: Get users in databases (method: get)
            UPDATE_USER: '/:ID',  // /update-profile -> /:ID  note: Update a user by ID (method: put)
            GET_USER_BY_EMAIL: '/:email', // method get,
            DELETE_USER: '/:ID', // Delete a user by ID (method: delete)
            CONFIRM_REGISTER: '/confirm-register', // method: post
            CHANGE_AVATAR: '/change-avatar',
            UPDATE_POINT: '/update-point',
            LOGIN: '/login',
            SEND_EMAIL_CODE: '/send-email-code',
            CHANGE_PASSWORD: '/change-password',
            FORGOT_PASSWORD: '/forgot-password',
            UPDATE_POSITION: '/position',
            UPDATE_PROFILE: '/profile/:email'
        },
        MAIN: {
            CREATE_MAIN: '/' // note Create a new Main for user first login
        },
        WORD: {
            CREATE_WORD: '/',
            UPDATE_WORD: '/:ID',
            DELETE_WORD: '/:ID',
            GET_WORDS: '/:email'
        },
        EXAMPLE: {
            CREATE_EXAMPLE: '/',
            UPDATE_EXAMPLE: '/:ID',
            DELETE_EXAMPLE: '/:ID',
            GET_EXAMPLES: '/:email'
        },
        BADWORD: {
            CREATE_BADWORD: '/',
            UPDATE_BADWORD: '/:ID',
            DELETE_BADWORD: '/:ID',
            GET_BADWORDS: '/:email'
        },
        RANK: {
            GET_RANKS: '/'
        }
    }
}