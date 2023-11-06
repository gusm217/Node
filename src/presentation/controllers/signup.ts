import { badRequest, serverError } from '../helpers/http-helper'
import { MissingParamErrors, InvalidParamError } from '../errors'
import { type Controller, type Emailvalidator, type HttpRequest, type HttpResponse } from '../protocols'
export class SignUpController implements Controller {
  private readonly emailValidator: Emailvalidator

  constructor (emailValidator: Emailvalidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const fieldsRequired = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of fieldsRequired) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamErrors(field))
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
