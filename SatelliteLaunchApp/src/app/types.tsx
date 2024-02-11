// export type FlightStatusType = 'черновик' | 'удален' | 'сформирован' | 'утвержден' | 'отклонен'

export type PayloadCardType = {
    payload_id: number
    img_url?: string
    is_available?: boolean
    title?: string
    description?: string
    load_capacity?: number
    flight_date_start?: Date
    flight_date_end?: Date
    desired_price?: number
    detailed_desc?: string
    count?: number
}

export type RocketFlightType = {
    flight_id?: number
    creator_id?: number
    creator_login?: string
    moderator_id?: number
    moderator_login?: string
    status?: string
    created_at?: Date
    formed_at?: Date
    confirmed_at?: Date
    flight_date?: Date | string
    price?: number
    title?: string
    place_number?: number
}

export type FlightsPayloads = {
    flight_id: number
    payload_id: number
    count_satellites: number 
}

export type UserType = {
    user_id?: number
    login: string
    email?: string
    password?: string
    is_admin?: boolean
}
  