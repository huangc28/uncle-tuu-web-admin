import { useState, useRef } from 'react'
import Uploader from 'rsuite/Uploader'
import Button from 'rsuite/Button' 
import { FlexboxGrid } from 'rsuite'
import { css } from '@emotion/react'

const containerStyle = css`
  padding: 20px;
  display: grid; 
  grid-template-rows: 1fr 3fr; 
`

const titleContainerStyle = css`
  color: white;
`

const uploadAreaStyle = css`
  background-color: #1F2231;
  padding: 15px;
`

const errorMessageStyle = css`
  color: #B00020
`

// If file type is of the followings, we allow queue to be updated.
//
// - .csv
// - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
// - application/vnd.ms-excel
const csv = '.csv'
const spreadSheet = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const msSpreadSheet = 'application/vnd.ms-excel'

const allowedUpadedFileMimes = {
  [csv]: true,    
  [spreadSheet]: true,
  [msSpreadSheet]: true,
}

// TODOs
//   - [x]Upload Area
//   - [] 檢查檔案為 excel
//   - []顯示檔案名稱
//   - []檢查檔案名稱
//   - []顯示上傳狀態
//   - []顯示入庫狀態
function Home() {
  const [fileList, setFileList] = useState([])
  const [uploadError, setUploadErrorMessage] = useState(null) 
  const uploaderRef = useRef()
  const handleUpload = () => {
    console.log('trigger handle upload', fileList)
  }
  
  return (
    <div css={containerStyle}>
      <div css={titleContainerStyle}>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item 
            colspan={8}
            css={css`text-align:center`}
          >
            <h2>
              上傳採購單
            </h2>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <hr />
      </div>
    
      {/* Upload Area */}
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={24} >
          <div css={uploadAreaStyle}>
            <Uploader 
              value={fileList}
              onChange={fileList => {
                setUploadErrorMessage(null)
                setFileList(fileList)
              }}
              autoUpload={false}
              action="" 
              draggable
              ref={uploaderRef}
              shouldQueueUpdate={fileList => {
                return new Promise((resolve, reject) => {
                  const file = fileList[0]
                  const { blobFile = {} } = file
                  
                  // Check the mime type of the file.
                  if (allowedUpadedFileMimes[blobFile.type]) {
                    resolve(true)
                    
                    return
                  }

                  // Set error message state
                  setUploadErrorMessage('請上傳 excel 兼容檔案, 如 xlsx, xls')
                  resolve(false)
                })
              }}
            >
              <div style={{
                height: '230px',
                backgroundColor: 'transparent',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                點擊貨拖曳上傳採購單
              </div>
            </Uploader>
            
            {/* Upload Error */}
            {
              uploadError && (
                <p css={errorMessageStyle}> 
                  {uploadError}
                </p> 
              )
            }
          </div>
          
          <hr />

          <Button 
            disabled={!fileList.length}
            onClick={handleUpload}
          >
            上傳
          </Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      
      {/* File name */}
    </div>
  )  
}

export default Home