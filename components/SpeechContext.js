import React, {createContext, useContext, useState} from 'react'

const SpeechContext = createContext()

export const useSpeechContext = () => useContext(SpeechContext)

export const SpeechProvider = ({children}) => {
  const [speechOptions, setSpeechOptions] = useState({
    language: 'ro-RO',
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0,
  })

  return (
    <SpeechContext.Provider value={{speechOptions, setSpeechOptions}}>
      {children}
    </SpeechContext.Provider>
  )
}
