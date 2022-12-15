import http from '../http-common'
import IRarity from '../types/rarity.type'
import FormData from 'form-data'

class RaritiesService {
    async getAll() {
        const { data, status } =  await http.get<IRarity[]>("/rarities")
        return { data, status }
    }

    async search(term: string) {
        const postData = new FormData()
        postData.append('search_term', term)
        const { data, status } = await http.post<IRarity[]>("/rarities/search", postData)
        return { data, status }
    }

    async create(input: IRarity) {
        let postData = new FormData()
        postData.append('name', input.name)
        postData.append('description', input.description)
        postData.append('color_code', input.color_code)
        return await http.post<FormData>("/rarities", postData)
    }

    async delete(id: number) {
        return http.delete<number>(`/rarities/${id}`)
    }
}

export default new RaritiesService()
