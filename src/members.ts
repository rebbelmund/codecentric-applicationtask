import Member from './model/Member'
import Language from './model/Language'
import axios from 'axios'

export async function getMembers() {
  // TODO: refactor to class
  // const axios = require('axios')

  async function axiosGet(url: string): Promise<any> {
    return axios.get(url, {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer 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', // TODO: get auth token from env file
      },
    })
  }

  async function getLanguages(repos_url: string): Promise<Language[]> {
    return axiosGet(repos_url).then((response: any) => {
      return new Promise((resolve, reject) => {
        const langProjects:Language[] = []
        const promises: Promise<void>[] = []
        response.data.forEach((repo: any) => {
          promises.push(
            axiosGet(repo.languages_url).then((repoLangs: any) => {
              Object.keys(repoLangs.data).forEach((repoLang) => {
                const storedLang = langProjects.find(lang => lang.name === repoLang)
                if(storedLang){
                  storedLang.projectCount++  
                } else {
                  langProjects.push(new Language(repoLang, 1))
                }
              })
            }),
          )
        })
        Promise.all(promises).then(() => resolve(langProjects as Language[]))
      })
    })
  }

  async function getMemberData(member: any): Promise<Member> {
    return new Promise((resolve, reject) => {
      const newMember: Member = new Member(member.id, member.login)

      const promises: Promise<void>[] = []
      promises.push(
        axiosGet(member.url).then((response: any) => {
          newMember.name = response.data.name
        }),
      )
      promises.push(
        getLanguages(member.repos_url).then((langList: Language[]) => {
          newMember.languages = langList
        }),
      )
      Promise.all(promises).then(() => resolve(newMember))
    })
  }

  async function getMemberStorage(): Promise<Member[]> {
    return new Promise((resolve, reject) => {
      const memberStorage: Member[] = []
      axiosGet('https://api.github.com/orgs/codecentric/members').then((response: any) => {
        const promises: Promise<void>[] = []
        response.data.slice(0,2).forEach((member:any) => { // use while development to save on request limit
        // response.data.forEach((member: any) => {
          promises.push(
            getMemberData(member).then((newMember) => {
              memberStorage.push(newMember as Member)
            }),
          )
        })
        Promise.all(promises).then(() => resolve(memberStorage))
      })
    })
  }

  return getMemberStorage()
}
