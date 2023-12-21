export interface ILanguage {
  name: string
  projectCount: number
}

export default class Language implements ILanguage {
  constructor(
    private _name: string = '',
    private _projectCount: number = 0,
  ) {}

  get name(): string {
    return this._name
  }

  get projectCount(): number {
    return this._projectCount
  }

  set projectCount(projectCount: number) {
    this._projectCount = projectCount
  }

  incrementProjectCount () {
    this._projectCount++
  }
}
