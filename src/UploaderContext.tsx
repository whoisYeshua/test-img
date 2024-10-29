import { createContext, useContext, useState } from 'react'
import { DEFAULT_IMAGE_TYPE } from './Uploader'

import type { Dispatch, SetStateAction } from 'react'

type UploaderContexType = {
  fileType: string
  fileSize: number | null
}
const DEFAULT_UPLOADER_CONTEXT_DATA = {
  fileType: DEFAULT_IMAGE_TYPE,
  fileSize: null,
}
const UploaderContext = createContext<UploaderContexType>(DEFAULT_UPLOADER_CONTEXT_DATA)
const SetUploaderContext = createContext<Dispatch<SetStateAction<UploaderContexType>> | null>(null)

export const useUploader = () => {
  const setUploaderData = useContext(SetUploaderContext)
  if (!setUploaderData) throw new Error('not found SetUploaderContext')
  const uploaderData = useContext(UploaderContext)
  return { ...uploaderData, setUploaderData }
}

export const UploaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<UploaderContexType>(DEFAULT_UPLOADER_CONTEXT_DATA)

  return (
    <UploaderContext.Provider value={state}>
      <SetUploaderContext.Provider value={setState}>{children}</SetUploaderContext.Provider>
    </UploaderContext.Provider>
  )
}
