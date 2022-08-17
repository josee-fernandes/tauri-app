import React from 'react'

import { message } from '@tauri-apps/api/dialog'
import { FsTextFileOption, readTextFile, writeFile } from '@tauri-apps/api/fs'

const appStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}

const wrapperCenter: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  width: '100%',
}

const App: React.FC = () => {
  const [content, setContent] = React.useState('File content here...')

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent((oldContent) =>
        oldContent !== event.target.value ? event.target.value : oldContent
      )
    },
    []
  )

  const handleCreateFile = React.useCallback(async () => {
    console.log('creating file')

    try {
      const newFile: FsTextFileOption = {
        path: './test.txt',
        contents: content,
      }

      await writeFile(newFile)
      await message('File created!✨')
    } catch (error) {
      console.log({ error })
      await message(`Error: ${error}`)
    }
  }, [content])

  const handleReadFile = React.useCallback(async () => {
    try {
      const response = await readTextFile('./test.txt')

      await message(`File readied!✨\n ${response}`)
    } catch (error) {
      await message(`Error: ${error}`)
    }
  }, [])

  return (
    <div className="App" style={appStyles}>
      <div style={wrapperCenter}>
        <div>
          <h1>Saving Files</h1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: '1rem',
          }}
        >
          <textarea
            cols={30}
            rows={10}
            value={content}
            maxLength={300}
            placeholder="Seu texto aqui..."
            onChange={handleInputChange}
            style={{
              resize: 'none',
              maxWidth: '500px',
              width: '90%',
            }}
          />
        </div>

        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <button onClick={handleCreateFile}>Create File</button>
          <button onClick={handleReadFile}>Read File</button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          Created with 💜 by{' '}
          <a
            href="https://github.com/josee-fernandes"
            target="_blank"
            rel="noopener"
          >
            José Fernandes
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default App
