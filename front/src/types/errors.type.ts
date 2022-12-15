export default interface ErrorsType {
    response: {
        data: {
            errors: {
                field: string
            }[]
        }
    }
}
