export class UserResponseDto {
    constructor(
    ) {
        this.userName = "";
        this.jwtToken = "";
        this.expires = new Date;
        this.refreshToken = "";
        this.refreshTokenExpires = new Date;
        this.userId = "";
        this.companyId = 0;
        this.type = 0;
    }
    public userName: string;
    public jwtToken: string;
    public expires: Date;
    public refreshToken: string;
    public refreshTokenExpires: Date;
    public userId: string;
    public companyId: number;
    public type: number;
}