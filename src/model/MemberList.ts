import Member from "./Member";
import Language from "./Language";

interface IMemberList {
    members: Member[],
    addMember(member: Member): void,
    save(): void,
    load(): void,
}

const STORAGE_VAR:string = 'members'


export default class MemberList implements IMemberList {

    static instance: MemberList = new MemberList()


    constructor (private _members: Member[] = []){}

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

    load(): void {
        const storedList: string | null = localStorage.getItem(STORAGE_VAR)
        if (typeof storedList !== 'string') return
        const parsedList = JSON.parse(storedList)
        parsedList.forEach((member : any)=> {
            const langList: Language[] = []
            member._languages.forEach((language: any)=> langList.push(new Language(language._name, language.projectCount)))
            const newMember = new Member(member.id, member.login, member.name, langList)
            MemberList.instance.addMember(newMember)
        })
    }

}
