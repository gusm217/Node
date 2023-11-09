import { type AccountModel } from '../../../domain/usecases/add-account'
import { type AddAccountModel } from '../../../domain/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
