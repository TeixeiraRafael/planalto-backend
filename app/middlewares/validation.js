import { registerValidator } from "./validators/user.js"
import { loginValidator, refreshValidator} from "./validators/auth.js"

export const user = {
    registerValidator
}

export const auth = {
    loginValidator,
    refreshValidator
}