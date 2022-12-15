import http from '../http-common'
import IItemType from '../types/itemType.type'
import FormData from 'form-data'

class ItemTypesService {
    async getAll() {
        const { data, status } = await http.get<IItemType[]>("/itemTypes")
        return { data, status }
    }

    async search(term: string) {
        const postData = new FormData()
        postData.append('search_term', term)
        const { data, status } = await http.post<IItemType[]>("/itemTypes/search", postData)
        return { data, status }
    }

    async create(data: IItemType) {
        let postData = new FormData()
        postData.append('name',data.name)
        postData.append('description', data.description)
        data.image && data.image.name && postData.append('image', data.image)
        postData.append('consumable', data.consumable)
        postData.append('max_stack', data.max_stack)
        return await http.post<FormData>("/itemTypes", postData)
    }

    async delete(id: number) {
        return http.delete<number>(`/itemTypes/${id}`)
    }
}

export default new ItemTypesService()
