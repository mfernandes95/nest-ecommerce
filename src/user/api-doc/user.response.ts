import { ApiProperty } from "@nestjs/swagger"

export class UserResponse {
    @ApiProperty()
    id: string

    @ApiProperty({
        type: String,
        description: 'name of user'
    })
    name: string

    @ApiProperty({
        type: String,
        description: 'email of user'
    })
    email: string

    @ApiProperty()
    created_at: Date
}