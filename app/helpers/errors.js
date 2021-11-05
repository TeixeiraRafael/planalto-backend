export const internalServerError = (res) => {
    res.status(500).send({
        success: false,
        message: "Internal Server Error."
    })
}