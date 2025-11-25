export enum ApiSendCommands {
    SET_USERNAME = "SetUsername",
    CREATE_ROOM = "CreateRoom",
    JOIN_ROOM = "JoinRoom",
    START_GAME = "StartGame",
    GET_AND_SEND_EMOJIS = "GetAndSendEmojis",
    CHECK_WORD = "CheckWord",
}

export enum ApiRecieveCommands {
    USERNAME_SET = "UsernameSet",
    CREATED_ROOM = "CreatedRoom",
    JOINED_ROOM = "JoinedRoom",
    GAME_STARTED = "GameStarted",
    RECIEVE_EMOJIS = "ReceiveEmojis",
    RECIEVE_WORD = "ReceiveWord",
    COMMANDER_SELECTED = "CommanderSelected",
    COMMANDER_ANNOUNCED = "CommanderAnnounced",
    CORRECT_GUESS = "CorrectGuess",
    INCORRECT_GUESS = "IncorrectGuess",
    PLAYER_LEFT = "PlayerLeft",
    ROUND_ENDED = "RoundEnded",
    ERROR = "Error",
    USERNAME = "Username",
    ROOM_CODE = "RoomCode"
}