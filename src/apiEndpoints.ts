export interface CurrentUserDataPayload {
    username: string,
    roomCode: string
};

export interface JoinedRoomPayload {
    roomName: string,
    category: string,
    rounds: number,
    roundDuration: number,
    roomCreator: string,
    players: string[]
};

export const ApiEndpoints = {
    SIGN_UP: {
        SEND: "createUser",
        RECIEVE: "createdUser",
        ERRORS: [
            {
                CODE: "INCORRECT_USERNAME",
                MESSAGE: "The username provided is invalid. Please use only allowed characters and ensure it is the correct length."
            },
            {
                CODE: "INCORRECT_PASSWORD",
                MESSAGE: "The password does not meet security requirements. Please use a stronger password."
            },
            {
                CODE: "USERNAME_TAKEN",
                MESSAGE: "This username is already taken. Please choose a different one."
            }
        ]
    },
    LOGIN: {
        SEND: "loginUser",
        RECIEVE: "userLoggedIn",
        ERRORS: [
            {
                CODE: "INCORRECT_USERNAME_PASSWORD",
                MESSAGE: "The username or password is incorrect. Please try again."
            }
        ]
    },
    CURRENT_USER_DATA: {
        SEND: "getCurrentUserData",
        RECIEVE: "currentUserData",
        ERRORS: [
            {
                CODE: "INCORRECT_CONNECTION_ID",
                MESSAGE: "Your session is invalid or has expired. Please log in again."
            }
        ]
    },
    USER_DATA: {
        SEND: "getUserData",
        RECIEVE: "userData",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to access this user's data."
            }
        ]
    },
    CREATE_ROOM: {
        SEND: "createRoom",
        RECIEVE: "createdRoom",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to create a room."
            },
            {
                CODE: "JOINED_DIFFERENT_ROOM",
                MESSAGE: "You are already in a different room. Please leave it before creating a new one."
            },
            {
                CODE: "INCORRECT_ROOM_NAME",
                MESSAGE: "The room name provided is invalid. Please check the allowed characters and length."
            },
            {
                CODE: "INCORRECT_ROOM_CATEGORY",
                MESSAGE: "The selected room category is invalid. Please choose a valid category."
            },
            {
                CODE: "INCORRECT_ROUND_AMOUNT",
                MESSAGE: "The number of rounds specified is invalid. Please select a valid amount."
            },
            {
                CODE: "INCORRECT_ROUND_DURATION",
                MESSAGE: "The duration for each round is invalid. Please select a valid time."
            }
        ]
    },
    JOIN_ROOM: {
        SEND: "joinRoom",
        RECIEVE: "joinedRoom",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to join this room."
            },
            {
                CODE: "JOINED_DIFFERENT_ROOM",
                MESSAGE: "You are already in a different room. Please leave it before joining another."
            },
            {
                CODE: "INCORRECT_ROOM_CODE",
                MESSAGE: "The room code entered is invalid. Please check and try again."
            },
            {
                CODE: "ROOM_GAME_STARTED",
                MESSAGE: "Cannot join this room as the game has already started."
            }
        ]
    },
    LEAVE_ROOM: {
        SEND: "leftRoom",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to leave this room."
            }
        ]
    },
    START_GAME: {
        SEND: "startGame",
        RECIEVE: "gameStarted",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to start the game."
            },
            {
                CODE: "ROOM_GAME_STARTED",
                MESSAGE: "The game has already started in this room."
            },
            {
                CODE: "NOT_ENOUGH_PLAYERS",
                MESSAGE: "There are not enough players to start the game."
            }
        ]
    },
    GET_COMMANDER: {
        SEND: "getCommander",
        RECIEVE: "commanderSelected",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to select the commander."
            }
        ]
    },
    GET_WORD: {
        SEND: "getWord",
        RECIEVE: "recievedWord",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to get the word."
            }
        ]
    },
    SEND_EMOJIS: {
        SEND: "sendEmojis",
        RECIEVE: "emojisRecieved",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to send emojis."
            }
        ]
    },
    CHECK_WORD: {
        SEND: "checkWord",
        RECIEVE: "wordChecked",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to check the word."
            }
        ]
    },
    GET_RESULTS: {
        SEND: "getResuts",
        RECIEVE: "roundEnded",
        ERRORS: [
            {
                CODE: "FORBIDDEN",
                MESSAGE: "You do not have permission to view the results."
            }
        ]
    },
    PLAYER_JOINED: {
        RECIEVE: "playerJoined",
        ERRORS: []
    },
    PLAYER_LEFT: {
        RECIEVE: "playerLeft",
        ERRORS: []
    },
    GAME_ENDED: {
        RECIEVE: "gameEnded",
        ERRORS: []
    },
    RECIEVE_EMOJIS: {
        RECIEVE: "recieveEmojis",
        ERRORS: []
    },
    ROUND_STARTED: {
        RECIEVE: "roundStarted",
        ERRORS: []
    },
    ERROR: {
        RECIEVE: "Error",
        ERRORS: []
    }
};