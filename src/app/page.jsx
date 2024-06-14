'use client'

import Image from "next/image";
import { Dictionary } from "@/services/DictionaryApi";
import { useState } from "react";

export default function Home() {

  const [word, findWord] = useState('')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isNoResult, setIsNoResult] = useState(false)

  const HandleEnter = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsLoading(true)
      try {
        const dictData = await Dictionary(word)
        setIsLoading(false)
        setData(dictData)
        if (!dictData) {
          setIsNoResult(true)
          console.log(data)
        }
        else {
          setIsNoResult(false)
        }
      }
      catch (error) {
        setIsNoResult(false)
        console.log(error)
      }
    }
  }

  const HandleSearch = async (word) => {
    setIsLoading(true)
      try {
        const dictData = await Dictionary(word)
        setIsLoading(false)
        setData(dictData)
        if (!dictData) {
          setIsNoResult(true)
          console.log(data)
        }
        else {
          setIsNoResult(false)
        }
      }
      catch (error) {
        setIsNoResult(false)
        console.log(error)
      }
  }

  // const handlePlay = (source) => {
  //   let phoneticAudio = new Audio(source)
  //   phoneticAudio.play()
  // }

  return (
    <main className="flex justify-center min-h-screen items-center px-4 py-10">
      <div className="flex flex-col gap-6 w-full md:w-[80%] lg:w-[60%]">
        <div className="text-center flex flex-col items-center gap-2 w-full">
          <h1 className="font-extrabold text-2xl text-title-color">Weriam<span className="text-accent-color">Mebster</span></h1>
          <p className="text-sm md:text-base text-text-color md:w-[80%] lg:w-[60%]">We are a comprehensive online dictionary dedicated to providing accurate definitions for any word you search. Start your exploration today!</p>
        </div>
        <div className="text-center w-full">
          <div className="relative">
            <input 
              type="text" 
              placeholder="What word do you want to look up?" 
              className="w-full border border-accent-color rounded-full px-6 text-sm md:text-base py-4 outline-none"
              onChange={(e) => findWord(e.target.value)}
              onKeyDown={HandleEnter}
            />
            <div onClick={() => HandleSearch(word)} className="absolute top-0 bottom-0 right-0 rounded-full bg-accent-color h-full w-14 text-center flex items-center justify-center p-2">
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>
        {
          isLoading && (
            <div className="text-center p-4">
              <h1 className="text-text-color">
                Please wait...
              </h1>
            </div>
          )
        }
        {
          isNoResult && (
            <div className="text-center p-4">
              <h1 className="text-text-color">
                No results found
              </h1>
            </div>
          )
        }
        {
          typeof data !== 'undefined' && 
          <>
            {
              data.map((item, index) => (
                <div key={index} className="border border-accent-color rounded-lg w-full p-4 md:p-10 lg:p-14 flex flex-col gap-4">
                      <div>
                          <div className="flex gap-2 items-center">
                            <h1 className="text-title-color font-bold text-lg md:text-2xl">{item.word}</h1>
                            {/* <svg onClick={handlePlay(item.phonetics.audio)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-text-color">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                            </svg> */}
                          </div>
                          <p className="text-text-color text-sm md:text-base">{item.phonetic}</p>
                      </div>
                      <div className="flex flex-col gap-4">
                        {
                          item.meanings.map((mean, i) => (
                            <div key={i}>
                              <h1 className="text-sm font-semibold text-title-color md:text-lg">{mean.partOfSpeech}</h1>
                              <ul className="list-disc list-inside mb-4">
                                {
                                  mean.definitions.map((def, j) => (
                                    <li key={j} className="text-xs md:text-base text-text-color mt-2">{def.definition}</li>
                                  ))
                                }
                              </ul>
    
                              {
                                mean.synonyms.length > 0 ? (
                                  <div className="text-xs md:text-sm mt-2">
                                    <p className="font-medium text-title-color leading-5">Synonyms: <span className="font-regular text-text-color">{mean.synonyms.join(', ')}</span></p>
                                  </div>
                                )
                                : 
                                (
                                  <div className="text-xs md:text-sm mt-2">
                                    <p className="font-medium text-title-color">Synonyms: <span className="font-regular text-text-color">No Results</span></p>
                                  </div>
                                )
                              }
                              {
                                mean.antonyms.length > 0 ? (
                                  <div className="text-xs md:text-sm mt-2">
                                    <p className="font-medium text-title-color leading-5">Antonyms: <span className="font-regular text-text-color">{mean.antonyms.join(', ')}</span></p>
                                  </div>
                                )
                                : 
                                (
                                  <div className="text-xs md:text-sm mt-2">
                                    <p className="font-medium text-title-color">Antonyms: <span className="font-regular text-text-color">No Results</span></p>
                                  </div>
                                )
                              }
                            </div>
                          ))
                        }
                      </div>
                </div>
              ))
            }
          </>
        }
      </div>
    </main>
  );
}
