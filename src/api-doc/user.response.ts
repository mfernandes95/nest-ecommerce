import { ApiProperty } from "@nestjs/swagger"

export class UserResponse {
    @ApiProperty()
    id: number

    @ApiProperty({
        type: String,
        description: 'name of user'
    })
    name: String

    @ApiProperty({
        type: String,
        description: 'email of user'
    })
    email: String

    @ApiProperty()
    created_at: Date
}