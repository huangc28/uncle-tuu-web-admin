import { useState, useRef, useEffect } from 'react'
import {  useDispatch, connect } from 'react-redux'
import Uploader from 'rsuite/Uploader'
import Button from 'rsuite/Button'
import { FlexboxGrid } from 'rsuite'
import { css } from '@emotion/react'

import loadingStatus from 'Atuu/constants/loading_status.js'
import { uploadProcurement, selectLoadingStatus, selectUploadError } from './redux/upload_procurement'

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
  color: #B00020;
`

const successMessageStyle = css`
  color: #4F8A10;
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
//   - [x] 檢查檔案為 excel
//   - [x]顯示檔案名稱
//   - [x]顯示上傳狀態
//   - [x]Only support upload one file at a time 
//   - []顯示入庫狀態
function UploadProcurement({ uploadStatus, uploadAPIError }) {
  const [fileList, setFileList] = useState([])
  const [uploadError, setUploadErrorMessage] = useState(null)
  
  const uploaderRef = useRef()
  const dispatch = useDispatch()
  const handleUpload = () => {
    setUploadErrorMessage(null)
    dispatch(uploadProcurement(fileList))
  }

  useEffect(() => {
    if (uploadStatus === loadingStatus.FAILED) {
      setUploadErrorMessage(uploadAPIError.message)
    }

    if (uploadStatus === loadingStatus.SUCCESS) {
      setFileList([])
    }
  }, [uploadStatus])

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
              fileList={fileList}
              onChange={fileList => {
                setUploadErrorMessage(null)
                setFileList(fileList)
              }}
              autoUpload={false}
              action=""
              draggable
              ref={uploaderRef}
              shouldQueueUpdate={fileList => new Promise((resolve, reject) => {
                  if (fileList.length > 1) {
                    setUploadErrorMessage('目前只支援上傳一個檔案')
                    setFileList(fileList.slice(0, 1))
                    reject(false)
                    
                    return
                  }
                  
                  const file = fileList[0]
                  const { blobFile = {} } = file

                  if (!allowedUpadedFileMimes[blobFile.type]) {
                    // Set error message state
                    setUploadErrorMessage('請上傳 excel 兼容檔案, 如 xlsx, xls')
                    reject(false)

                    return
                  }

                  resolve(true)
                })
              }
            >
              <div style={{
                height: '230px',
                backgroundColor: 'transparent',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                點擊或拖曳上傳採購單
              </div>
            </Uploader>

            {/* Upload error */}
            {
              uploadError && (
                <p css={errorMessageStyle}>
                  {uploadError}
                </p>
              )
            }
            
            {/* Upload success */}
            {
              uploadStatus === loadingStatus.SUCCESS && (
                <p css={successMessageStyle}>
                  上傳成功
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

const mapStateToProps = (state, _) => ({ 
  uploadStatus: selectLoadingStatus(state),
  uploadAPIError: selectUploadError(state),
})
export default connect(mapStateToProps, null)(UploadProcurement)