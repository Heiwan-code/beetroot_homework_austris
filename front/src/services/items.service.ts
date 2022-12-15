import http from '../http-common'
import FormData from 'form-data'
import IItem from '../types/item.type'

class ItemsService {
    async getAll() {
        // items/... (╬ಠ﹏ಠ) Tried to use manual routes instead of .resources, but no dice
        const { data, status } = await http.get<IItem[]>("/items/")
        return { data, status }
    }

    async search(term: string) {
        const postData = new FormData()
        postData.append('search_term', term)
        const { data, status } =  await http.post<IItem[]>("/items/search", postData)
        return {data, status}
    }

    async create(data: IItem) {
        let postData = new FormData()
        postData.append('name',data.name)
        postData.append('description', data.description)
        data.image && data.image.name && postData.append('image', data.image)
        postData.append('item_type_id', data.item_type_id)
        postData.append('rarity_id', data.rarity_id)
        return await http.post<FormData>("/items", postData)
    }

    async delete(id: number) {
        return http.delete<number>(`/items/${id}`)
    }
}

export default new ItemsService()
