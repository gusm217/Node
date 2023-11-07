import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { MissingParamErrors, InvalidParamError } from '../../errors'
import { type Controller, type Emailvalidator, type HttpRequest, type HttpResponse, type AddAccount } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: Emailvalidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: Emailvalidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
