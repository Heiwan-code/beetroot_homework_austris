import React, {ChangeEvent, useState} from 'react'
import IRarity from '../../../types/rarity.type'
import RarityService from '../../../services/rarities.service'
import {ChromePicker} from 'react-color'
import TextInputField from '../../General/Form/TextInputField'
import FormButton from '../../General/Form/FormButton'
import AddOneForm from '../Base/AddOneForm'
import ErrorsType from '../../../types/errors.type'

type Props = {
    onAdd: () => void
}

const AddRarity = ({onAdd}: Props) => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [colorCode, setColorCode] = useState<string>('#ffffff')
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [published, setPublished] = useState<boolean>(false)
    const [caughtErrors, setCaughtErrors] = useState<
        {[key: string]: boolean}
    >(
    {
                name: false,
                description: false
            }
    )

    const onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>): void => {
        setDescription(e.target.value)
    }

    const onColorChange = (color: {hex: string}): void => {
        setColorCode(color.hex)
    }

    const saveRarity = async() => {
        const data: IRarity = {
            name: name,
            description: description,
            color_code: colorCode
        }

        setSubmitted(true)
        RarityService.create(data)
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
        setColorCode('')
    }

    return (
        <AddOneForm {...{
            submitted: submitted,
            published: published,
            onReset: reset
        }}>
            <h2 className='add-one-form__title text--spacious'>Add Rarity</h2>
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
            <ChromePicker
                // https://imgflip.com/i/73ylok
                // TODO: db columns should be in camelCase
                color={ colorCode }
                onChangeComplete={ onColorChange }
            />
            <FormButton {...{
                label: 'Add Rarity',
                onClick: saveRarity
            }}/>
        </AddOneForm>
    )
}
export default AddRarity
