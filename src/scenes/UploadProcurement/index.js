import { useState, useRef, useEffect } from 'react'
import {  useDispatch, connect } from 'react-redux'
import Uploader from 'rsuite/Uploader'
import Button from 'rsuite/Button'
import { FlexboxGrid, Divider } from 'rsuite'
import { css } from '@emotion/react'

import loadingStatus from 'Atuu/constants/loading_status.js'
import { uploadProcurement, selectLoadingStatus, selectUploadError, selectUploadedProcurement } from './redux/upload_procurement'

import ProcurementTemplate from './components/ProcurementTemplate'
import ProcurementStatusList from './containers/procurement_status_list'

const containerStyle = css`
  padding: 20px;
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

function UploadProcurement({ uploadStatus, uploadAPIError, uploadedProcurement }) {
  const [fileList, setFileList] = useState([])
  const [uploadError, setUploadErrorMessage] = useState(null)
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null)
  
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
      setUploadSuccessMessage(`${uploadedProcurement.filename} δΈε³ζε`)
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
              δΈε³ζ‘θ³Όε?
            </h2>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <hr />
      </div>
      
      {/* Excel Template */}
      <ProcurementTemplate />

      {/* Upload Area */}
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={24} >
          <div css={uploadAreaStyle}>
            <Uploader
              fileList={fileList}
              onChange={fileList => {
                setUploadErrorMessage(null)
                setUploadSuccessMessage(null)
                setFileList(fileList)
              }}
              autoUpload={false}
              action=""
              draggable
              ref={uploaderRef}
              shouldQueueUpdate={fileList => new Promise((resolve, reject) => {
                  if (fileList.length > 1) {
                    setUploadErrorMessage('η?εεͺζ―ζ΄δΈε³δΈεζͺζ‘')
                    setFileList(fileList.slice(0, 1))
                    reject(false)
                    
                    return
                  }
                  
                  const file = fileList[0]
                  const { blobFile = {} } = file

                  if (!allowedUpadedFileMimes[blobFile.type]) {
                    // Set error message state
                    setUploadErrorMessage('θ«δΈε³ excel εΌε?Ήζͺζ‘, ε¦ xlsx, xls')
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
                ι»ζζζζ³δΈε³ζ‘θ³Όε?
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
              uploadSuccessMessage && (
                <p css={successMessageStyle}>
                  { uploadSuccessMessage }
                </p>
              )
            }
          </div>

          <hr />

          <Button
            disabled={!fileList.length}
            onClick={handleUpload}
          >
            δΈε³
          </Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      {/* Procurement process status */}
      <div>
        <Divider />
        
        <h3 css={css`
          text-align: center;
          margin-bottom: 10px;
        `}> 
          ζ‘θ³Όε?ε₯εΊ«ηζ 
        </h3>
        
        <ProcurementStatusList />
      </div>
    </div>
  )
}

const mapStateToProps = (state, _) => ({ 
  uploadStatus: selectLoadingStatus(state),
  uploadAPIError: selectUploadError(state),
  uploadedProcurement: selectUploadedProcurement(state),
})

export default connect(mapStateToProps, null)(UploadProcurement)