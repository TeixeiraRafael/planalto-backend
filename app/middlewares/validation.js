import { registerValidator, userUpdateValidator } from "./validators/user.js"
import { loginValidator, refreshValidator} from "./validators/auth.js"
import { createCityValidator, updateCityValidator } from "./validators/city.js"
import { createBusValidator, updateBusValidator } from "./validators/bus.js"
import { createSeatValidator, updateSeatValidator, busExists } from "./validators/seat.js"
import { validOrigin, validDestination, createTripValidator, updateTripValidator } from './validators/trip.js'
import { createReservationValidator, updateReservationValidator, tripExists, seatExists, reservationOwner } from "./validators/reservation.js"

export const user = {
    registerValidator,
    userUpdateValidator
}

export const auth = {
    loginValidator,
    refreshValidator
}

export const city = {
    createCityValidator,
    updateCityValidator
}

export const bus = {
    createBusValidator,
    updateBusValidator
}

export const seat = {
    createSeatValidator,
    updateSeatValidator,
    busExists
}

export const trip = {
    busExists,
    validOrigin,
    validDestination,
    createTripValidator,
    updateTripValidator
}

export const reservation = {
    createReservationValidator,
    updateReservationValidator,
    tripExists,
    seatExists,
    reservationOwner
}