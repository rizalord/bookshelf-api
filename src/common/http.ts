class BaseResponseObject {

    status: string
    message?: string | null
    data?: any | null

    constructor(status: string, message?: string | null, data: any = null) {
        this.status = status
        this.message = message
        this.data = data
    }
}

export class SuccessResponseObject extends BaseResponseObject{
    constructor(message?: string | null, data?: any) {
        super('success', message , data)
    }
}

export class FailResponseObject extends BaseResponseObject {
  constructor(message?: string | null, data?: any) {
    super("fail", message, data)
  }
}

export class ErrorResponseObject extends BaseResponseObject{
    constructor(message?: string | null, data?: any) {
        super('error', message , data)
    }
}