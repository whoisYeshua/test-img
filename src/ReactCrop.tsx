import { useRef } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface ReactCropProps {
  imageSrc: string
}

export const ReactCrop = ({ imageSrc }: ReactCropProps) => {
  const cropperRef = useRef<ReactCropperElement>(null)
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper
    console.log(cropper!.getCroppedCanvas().toDataURL())
  }

  return (
    <Cropper
      src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
      initialAspectRatio={1}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
      viewMode={3}
    />
  )
}
