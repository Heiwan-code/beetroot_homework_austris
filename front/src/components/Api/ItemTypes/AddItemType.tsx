import React, {ChangeEvent, useState} from 'react'
import IItemType from '../../../types/itemType.type'
import ItemTypesService from '../../../services/itemTypes.service'
import TextInputField from '../../General/Form/TextInputField'
import ImageInputField from '../../General/Form/ImageInputField'
import FormButton from '../../General/Form/FormButton'
import AddOneForm from '../Base/AddOneForm'
import {Checkbox, TextField} from '@mui/material'
import ErrorsType from '../../../types/errors.type'
import NumberInputField from "../../General/Form/NumberInputField";
import CheckboxInputField from "../../General/Form/CheckboxInputField";

type Props = {
    onAdd: () => void
}

const AddItemType = ({onAdd}: Props) => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [consumable, setConsumable] = useState<number>(0)
    const [maxStack, setMaxStack] = useState<number>(1)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [published, setPublished] = useState<boolean>(false)
    const [caughtErrors, setCaughtErrors] = useState<
        {[key: string]: boolean}
    >(
        {
            name: false,
            description: false,
            image: false,
            max_stack: false
        }
    )

    const onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>): void => {
        setDescription(e.target.value)
    }
    const onChangeImage = (images: File[]): void => {
        console.log(images[0])
        if (images) {
            setImage(images[0])
        }
    }
    const onChangeConsumable = (e: ChangeEvent<HTMLInputElement>): void => {
        setConsumable(Number(e.target.checked))
    }
    const onChangeMaxStack = (e: ChangeEvent<HTMLInputElement>): void => {
        setMaxStack(Number(e.target.value))
    }

    const saveItemType = async() => {
        const data: IItemType = {
            name: name,
            description: description,
            image: image,
            consumable: consumable,
            max_stack: maxStack
        }
        setSubmitted(true)

        ItemTypesService.create(data)
            .then(() => {
                setPublished(true)
                onAdd()
            })
            .catch((e: ErrorsType) => {
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
        setCaughtErrors(caughtErrorsClone)
    }

    const reset = (): void => {
        setPublished(false)
        setSubmitted(false)
        setName('')
        setDescription('')
        setImage(null)
        setConsumable(0)
        setMaxStack(1)
    }

    return (
        <AddOneForm {...{
            submitted: submitted,
            published: published,
            onReset: reset
        }}>
            <h2 className='text--spacious'>Add Item Type</h2>
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
            <CheckboxInputField {...{
                label: 'consumable',
                onChange: onChangeConsumable
            }}/>
            { Boolean(consumable) && (
                <NumberInputField {...{
                    error: caughtErrors.max_stack,
                    label:'max_stack',
                    value:maxStack,
                    onChange: onChangeMaxStack
                }}/>
            )}
            <FormButton {...{
                label: 'Add Item Type',
                onClick: saveItemType
            }}/>
        </AddOneForm>
    )
}
export default AddItemType
