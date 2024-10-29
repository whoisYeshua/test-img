import { useState } from 'react'

import { EasyCrop } from './EasyCrop'
import { ImageCrop } from './ImageCrop'
import { Modal } from './Modal'
import { ReactCrop } from './ReactCrop'
import { Uploader } from './Uploader'
import { UploaderProvider } from './UploaderContext'

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const [isEasyCropOpen, setIsEasyCropOpen] = useState<boolean>(false)
  const [isImageCropOpen, setIsImageCropOpen] = useState<boolean>(false)
  const [isReactCropOpen, setIsReactCropOpen] = useState<boolean>(false)

  const handleCloseEasyCropModal = () => setIsEasyCropOpen(false)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <UploaderProvider>
          <Uploader imageSrc={imageSrc} onImageChange={setImageSrc} />
          {imageSrc && (
            <>
              <div>
                <button onClick={() => setIsEasyCropOpen(true)}>Open EasyCrop</button>
                {isEasyCropOpen && (
                  <Modal onClose={() => setIsEasyCropOpen(false)} title="EasyCrop">
                    <EasyCrop
                      imageSrc={imageSrc}
                      onCrop={(data: string) => {
                        setImageSrc(data)
                        handleCloseEasyCropModal()
                      }}
                    />
                  </Modal>
                )}
              </div>
              <div>
                <button className="secondary" onClick={() => setIsImageCropOpen(true)}>
                  Open ImageCrop
                </button>
                {isImageCropOpen && (
                  <Modal onClose={() => setIsImageCropOpen(false)} title="ImageCrop">
                    <ImageCrop imageSrc={imageSrc} />
                  </Modal>
                )}
              </div>
              <div>
                <button className="secondary" onClick={() => setIsReactCropOpen(true)}>
                  Open ReactCrop
                </button>
                {isReactCropOpen && (
                  <Modal onClose={() => setIsReactCropOpen(false)} title="ReactCrop">
                    <ReactCrop imageSrc={imageSrc} />
                  </Modal>
                )}
              </div>
            </>
          )}
        </UploaderProvider>
      </div>
    </>
  )
}

export default App
