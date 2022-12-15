import React, {useCallback} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'

type Props = {
    label: string,
    error?: boolean
    onChange: (images: File[]) => void
}

const ImageInputField = ({label, error, onChange}: Props) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles:1,
        onDrop
    })

    const files = acceptedFiles.map(({path, size}: FileWithPath) => (
        <li key={path}>
            {path} - {(size/1000000).toFixed(2)} MB
        </li>
    ))

    return (
        <section className={`container drag-n-drop ${error ? 'error' : ''}`}>
            <div {...getRootProps({className: `dropzone`})}>
                <input name={label} {...getInputProps()} />
                {
                    files.length > 0 ? (
                        files
                    ):(
                        <p>Drag 'n' drop a file here, or click to browse</p>
                    )
                }
            </div>
        </section>
    )
}

export default ImageInputField
