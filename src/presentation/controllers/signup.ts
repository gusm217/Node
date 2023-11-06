import { badRequest, serverError } from '../helpers/http-helper'
import { MissingParamErrors, InvalidParamError } from '../errors'
import { type Controller, type Emailvalidator, type HttpRequest, type HttpResponse } from '../protocols'
import { type AddAccount } from '../../domain/usecases/add-account'
export class SignUpController implements Controller {
  private readonly emailValidator: Emailvalidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: Emailvalidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const fieldsRequired = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of fieldsRequired) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamErrors(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })

      return {
        statusCode: 200,
        body: 'ok'
      }
    } catch (error) {
      return serverError()
    }
  }
}
