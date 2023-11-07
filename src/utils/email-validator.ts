import { type Emailvalidator } from '../presentation/protocols/email-validator'

export class EmailValidatorAdapter implements Emailvalidator {
  isValid (email: string): boolean {
    return false
  }
}
