export class BodyParamsError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class PushToGitHubError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ImageExistsInDatabaseError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class NoArtistsInDatabaseError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class NoImageByArtistInDatabaseError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class MissingAuthHeaderError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class NoArtistAccountExistsError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class AccountWithEmailExistsError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserCredentialDatabaseNotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class PasswordHashingError extends Error {
    constructor(message: string) {
        super(message);
    }
}
