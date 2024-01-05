import Member from './Member'
import Language from './Language'
import axios from 'axios'

interface IMemberList {
  members: Member[]
  addMember(member: Member): void
  save(): void
  load(): void
}

const STORAGE_VAR: string = 'members'

export default class MemberList implements IMemberList {
  static instance: MemberList = new MemberList()

  constructor(private _members: Member[] = []) {}

  get members(): Member[] {
    return this._members
  }

  set members(members: Member[]) {
    this._members = members
  }

  addMember(member: Member): void {
    this._members.push(member)
  }

  save(): void {
    localStorage.setItem(STORAGE_VAR, JSON.stringify(this._members))
  }

  async load(): Promise<Member[]> {
    return new Promise((resolve) => {
      const storedList: string | null = localStorage.getItem(STORAGE_VAR)
      if (typeof storedList === 'string') {
        const parsedList = JSON.parse(storedList)
        parsedList.forEach((member: any) => {
          const langList: Language[] = []
          member._languages.forEach((language: any) =>
            langList.push(new Language(language._name, language._projectCount)),
          )
          const newMember = new Member(member._id, member._login, member._avatar, member._name, langList)
          MemberList.instance.addMember(newMember)
        })

        resolve(MemberList.instance._members)
      } else {
        this.getMemberStorage().then(() => resolve(MemberList.instance._members))
      }
    })
  }

  private async _axiosGet(url: string): Promise<any> {
    return axios.get(url, {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    })
  }

 getLanguages(repos_url: string): Promise<Language[]> {
    return this._axiosGet(repos_url).then((response: any) => {
      return new Promise((resolve) => {
        const langProjects: Language[] = []
        const promises: Promise<void>[] = []
        response.data.forEach((repo: any) => {
          promises.push(
            this._axiosGet(repo.languages_url).then((repoLangs: any) => {
              Object.keys(repoLangs.data).forEach((repoLang) => {
                const storedLang = langProjects.find((lang) => lang.name === repoLang)
                if (storedLang) {
                  storedLang.projectCount++
                } else {
                  langProjects.push(new Language(repoLang, 1))
                }
              })
            }),
          )
        })
        Promise.all(promises).then(() =>
          resolve(
            langProjects.sort((a, b) => {
              if (a.projectCount < b.projectCount) {
                return 1
              }
              if (a.projectCount > b.projectCount) {
                return -1
              }
              return 0
            }) as Language[],
          ),
        )
      })
    })
  }

  async getMemberData(member: any): Promise<Member> {
    return new Promise((resolve) => {
      const newMember: Member = new Member(member.id, member.login)

      const promises: Promise<void>[] = []
      promises.push(
        this._axiosGet(member.url).then((response: any) => {
          newMember.name = response.data.name
          newMember.avatar = response.data.avatar_url
        }),
      )
      promises.push(
        this.getLanguages(member.repos_url).then((langList: Language[]) => {
          newMember.languages = langList
        }),
      )
      Promise.all(promises).then(() => resolve(newMember))
    })
  }

  public async getMemberStorage(): Promise<Member[]> {
    return new Promise((resolve) => {
      this._axiosGet('https://api.github.com/orgs/codecentric/members').then((response: any) => {
        const promises: Promise<void>[] = []
        // response.data.slice(0, 5).forEach((member:any) => { // use while development to save on request limit
        response.data.forEach((member: any) => {
          promises.push(
            this.getMemberData(member).then((newMember) => {
              this.addMember(newMember)
              console.info('member added: ', newMember.id)
            }),
          )
        })
        Promise.all(promises).then(() => {
          this._members.sort((a, b) => {
            if ((a.name || a.login) < (b.name || b.login)) {
              return -1
            }
            if ((a.name || a.login) > (b.name || b.login)) {
              return 1
            }
            return 0
          })
          this.save()
          resolve(this._members)
        })
      })
    })
  }
}
