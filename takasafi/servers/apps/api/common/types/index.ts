export type Role = 'admin' | 'manager' | 'driver'

export type GetUserType = {
    uid: string
    roles: Role[]
}