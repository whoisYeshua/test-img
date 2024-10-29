import { useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { compressImage, getCroppedImg, formatFileSize } from './utils'
import { useUploader } from './UploaderContext'

interface EasyCropProps {
  imageSrc: string
  onCrop: any
}

export const EasyCrop = ({ imageSrc, onCrop }: EasyCropProps) => {
  const { setUploaderData } = useUploader()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      if (!croppedAreaPixels) return
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
      if (!croppedImageBlob) return

      const imageFile = new File([croppedImageBlob.blob], 'my-image', { type: 'image/jpeg' })
      console.log('Before compress', formatFileSize(imageFile.size))
      const compressedImage = await compressImage(imageFile, { quality: 0.8 })
      console.log(
        setUploaderData({ fileSize: compressedImage.size, fileType: compressedImage.type })
      )
      console.log('After compress', formatFileSize(compressedImage.size))
      onCrop(URL.createObjectURL(compressedImage))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div style={{ position: 'relative', width: 500, height: 500 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <button onClick={showCroppedImage}>Save</button>
    </>
  )
}
