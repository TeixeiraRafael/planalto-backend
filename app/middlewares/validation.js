import { registerValidator, userUpdateValidator } from "./validators/user.js"
import { loginValidator, refreshValidator} from "./validators/auth.js"
import { createCityValidator, updateCityValidator } from "./validators/city.js"
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