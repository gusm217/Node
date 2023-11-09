import bcrypt from 'bcrypt'
import { type Encrypter } from '../../data/usecases/protocols/encrypter'

export class BcrypAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
