import { type Emailvalidator } from '../presentation/protocols/email-validator'
import validator from 'validator'

export class EmailValidatorAdapter implements Emailvalidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
