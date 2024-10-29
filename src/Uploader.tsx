import { useMemo, type ChangeEventHandler } from 'react'
import { formatFileSize } from './utils'
import { useUploader } from './UploaderContext'

export const DEFAULT_IMAGE_TYPE = 'image/*'

interface UploaderProps {
  imageSrc: any
  onImageChange: any
}

export const Uploader = ({ imageSrc, onImageChange }: UploaderProps) => {
  const { setUploaderData } = useUploader()

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploaderData({ fileSize: file.size, fileType: file.type })
    console.log(file.type)
    console.log(formatFileSize(file.size))
    onImageChange(URL.createObjectURL(file))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <FileType />
      <FileSize />
      <img
        src={imageSrc}
        width="200"
        height="200"
        style={{ objectFit: 'cover', borderRadius: '50%', border: '1px solid gray' }}
      />
    </div>
  )
}

const FileSize = () => {
  const { fileSize } = useUploader()
  const formattedFileSize = useMemo(() => (fileSize ? formatFileSize(fileSize) : '-'), [fileSize])
  return (
    <div>
      File size: <span style={{ color: 'gray' }}>{formattedFileSize}</span>
    </div>
  )
}

const FileType = () => {
  const { fileType } = useUploader()
  return (
    <div>
      Image type: <span style={{ color: 'gray' }}>{fileType}</span>
    </div>
  )
}
