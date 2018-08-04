export interface AccessToken {
    expires: number;
    identifier: string;
    expires_in: number;
    access_token: string;
    token_type: string;
}