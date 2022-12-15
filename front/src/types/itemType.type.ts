export default interface IItemType {
    id?: number | null
    name: string
    description: string
    consumable: number | boolean
    max_stack: number
    image?: File | null
    image_url?: string | null
    updated_at?: string
    created_at?: string
}
