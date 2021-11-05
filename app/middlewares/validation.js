import { registerValidator, userUpdateValidator } from "./validators/user.js"
import { loginValidator, refreshValidator} from "./validators/auth.js"

export const user = {
    registerValidator,
    userUpdateValidator
}

export const auth = {
    loginValidator,
    refreshValidator
}