import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamErrors } from '../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamErrors('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamErrors('email')
      }
    }
  }
}
