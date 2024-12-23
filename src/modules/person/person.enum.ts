export enum UserType {
    User,
    Artist,
    Admin
}

export enum UserStatus {
    /**
     * User account is still using and okay
     */
    Alived,

    /**
     * User account is deactived by some reasons
     */
    Deactive,

    /**
     * User account is deleted by themself or administrator
     */
    Deleted,

    /**
     * User account is waiting for confirmation
     */
    Waiting
}