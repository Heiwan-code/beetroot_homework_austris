import React, {ChangeEvent, useEffect, useState} from 'react'
import IItem from '../../../types/item.type'
import ItemsService from '../../../services/items.service'
import {SelectChangeEvent} from "@mui/material";
import TextInputField from "../../General/Form/TextInputField";
import ImageInputField from "../../General/Form/ImageInputField";
import FormButton from "../../General/Form/FormButton";
import SelectInputField from "../../General/Form/SelectInputField";
import IItemType from "../../../types/itemType.type";
import ItemTypesService from "../../../services/itemTypes.service";
import IRarity from "../../../types/rarity.type";
import RaritiesService from "../../../services/rarities.service";
import AddOneForm from "../Base/AddOneForm";
import ErrorsType from "../../../types/errors.type";

type Props = {
    onAdd: () => void
}

const AddItem = ({onAdd}: Props) => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [published, setPublished] = useState<boolean>(false)
    const [selectedItemType, setSelectedItemType] = useState<number>(1)
    const [selectedRarity, setSelectedRarity] = useState<number>(1)
    const [itemTypes, setItemTypes] = useState<IItemType[]>([{}] as IItemType[])
    const [rarities, setRarities] = useState<IRarity[]>([{}] as IRarity[])
    const [caughtErrors, setCaughtErrors] = useState<
        {[key: string]: boolean}
    >(
        {
            name: false,
            description: false,
            image: false
        }
    )

    const fetchItemTypes = async() => {
        const { data, status } = await ItemTypesService.getAll()
        setItemTypes(data)
    }

    const fetchRarities = async() => {
        const { data, status } = await RaritiesService.getAll()
        setRarities(data)
    }

    useEffect(() => {
        fetchItemTypes()
        fetchRarities()
    }, [])

    const onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>): void => {
        setDescription(e.target.value)
    }
    const onChangeImage = (images: File[]): void => {
        if (images) {
            setImage(images[0])
        }
    }

    const onItemTypeChange = (e: SelectChangeEvent<number>): void => {
        setSelectedItemType(Number(e.target.value))
    }

    const onRarityChange = (e: SelectChangeEvent<number>): void => {
        setSelectedRarity(Number(e.target.value))
    }

    const saveItem = async ()=> {
        const data: IItem = {
            name: name,
            description: description,
            image: image,
            item_type_id: selectedItemType,
            rarity_id: selectedRarity
        }
        setSubmitted(true)

        ItemsService.create(data)
            .then(() => {
                setPublished(true)
                onAdd()
            })
            .catch((e: ErrorsType) => {
                console.log(e)
                errorPrompt(e)
            })
    }

    const errorPrompt = async (axiosResp: ErrorsType) => {
        let caughtErrorsClone = Object.assign({}, caughtErrors)
        Object.keys(caughtErrorsClone).forEach(v => caughtErrorsClone[v] = false)
        await setCaughtErrors(caughtErrorsClone)
        axiosResp.response.data.errors.forEach((error) => {
            const field = String(error.field)
            caughtErrorsClone[field] = true
        })
        console.log(caughtErrorsClone)
        setCaughtErrors(caughtErrorsClone)
    }

    const reset = (): void => {
        setPublished(false)
        setSubmitted(false)
        setName('')
        setDescription('')
        setSelectedItemType(1)
        setSelectedRarity(1)
        setImage(null)
    }

    return (
        <AddOneForm {...{
            submitted: submitted,
            published: published,
            onReset: reset
        }}>
            <h2 className='text--spacious'>Add Item</h2>
            <TextInputField {...{
                error: caughtErrors.name,
                label: 'name',
                value:name,
                onChange: onChangeName
            }}/>
            <TextInputField {...{
                error: caughtErrors.description,
                label: 'description',
                value:description,
                onChange: onChangeDescription
            }}/>
            <ImageInputField {...{
                error: caughtErrors.image,
                label: 'image',
                onChange: onChangeImage
            }}/>
            <SelectInputField {...{
                label: 'item type',
                value: selectedItemType,
                onChange: onItemTypeChange,
                options: itemTypes
            }}/>
            <SelectInputField {...{
                label: 'rarity',
                value: selectedRarity,
                onChange: onRarityChange,
                options: rarities
            }}/>
            <FormButton {...{
                label: 'Add Item',
                onClick: saveItem
            }}/>
        </AddOneForm>
    )
}
export default AddItem
