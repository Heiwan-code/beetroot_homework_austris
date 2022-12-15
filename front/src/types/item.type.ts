import IRarity from "./rarity.type";
import IItemType from "./itemType.type";

export default interface IItem {
  id?: number | null
  name: string
  description: string
  image?: File | null
  image_url?: string | null
  item_type_id?: number | null
  rarity_id?: number | null
  rarity?: IRarity
  item_type?: IItemType
  updated_at?: string
  created_at?: string
}
