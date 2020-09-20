import axios from 'axios'
import React, { useEffect, useState, createRef } from 'react'
import './styles/FileUpload.css'

const FileUpload = ({ userId }) => {
  const [fileLength, setFileLength] = useState(0)
  const [fileText, setFileText] = useState('')
  const [fileName, setFileName] = useState('')
  const fileInput = createRef()

  useEffect(() => {
    axios
      .post('/file/getFile', {
        userId,
      })
      .then((payload) => {
        if (payload.data.success) {
          const retrievedFile = payload.data.file
          setFileLength(retrievedFile.length)
          setFileName(retrievedFile.name)
          setFileText(retrievedFile.text)
        } else {
          console.log('No file found')
        }
      })
      .catch((err) => console.error(err.message))
  }, [userId])

  const handleChange = (e) => {
    e.preventDefault()
    const name = fileInput.current.files[0].name
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target.result
      const len = text
        .replace(/\n/g, ' ')
        .split(' ')
        .filter((word) => word).length
      try {
        if (fileName) {
          await axios.put('/file/replaceFile', {
            userId,
            file: {
              name,
              text,
              length: len,
            },
          })
        } else {
          await axios.post('/file/uploadFile', {
            file: {
              userId,
              name: name,
              length: len,
              text: text,
            },
          })
        }
        setFileName(name)
        setFileLength(len)
        setFileText(text)
      } catch (err) {
        console.error(err.message)
      }
    }
    reader.readAsText(e.target.files[0])
  }

  return (
    <div className='fileUploadContainer'>
      <div className='uploadFileSection'>
        <label htmlFor='fileUpload'>
          Upload A File
          <input
            className='hidden'
            type='file'
            name='fileUpload'
            id='fileUpload'
            onChange={handleChange}
            ref={fileInput}
          />
        </label>
        <input
          type='text'
          name='fileName'
          id='fileName'
          onChange={() => {}}
          value={fileLength ? `${fileLength} words` : ''}
        />
      </div>
      {fileName && (
        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(fileText)}`}
          download={fileName}
        >
          Download{` ${fileName}`}
        </a>
      )}
    </div>
  )
}

export default FileUpload
