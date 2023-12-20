import Language from './Language'

export interface IMember {
  id: number
  login: string
  name: string
  languages: Language[]
}

export default class Member implements IMember {
  constructor(
    private _id: number = 0,
    private _login: string = '',
    private _name: string = '',
    private _languages: Language[] = [],
  ) {}

  get id(): number {
    return this._id
  }

  set id(id: number) {
    this._id = id
  }

  get login(): string {
    return this._login
  }

  set login(login: string) {
    this._login = login
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get languages(): Language[] {
    return this._languages
  }

  set languages(languages: Language[]) {
    this._languages = languages
  }
}
