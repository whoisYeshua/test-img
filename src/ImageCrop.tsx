import { useState } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropProps {
  imageSrc: string
}

export const ImageCrop = ({ imageSrc }: ImageCropProps) => {
  const [crop, setCrop] = useState<Crop>({ x: 100, y: 100, width: 200, height: 200, unit: 'px' })

  return (
    <ReactCrop crop={crop} onChange={c => setCrop(c)} circularCrop aspect={1}>
      <img src={imageSrc} />
    </ReactCrop>
  )
}
