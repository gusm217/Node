import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamErrors } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { type Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const fieldsRequired = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of fieldsRequired) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamErrors(field))
      }
    }
  }
}
