import { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import List from 'rsuite/List'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { fetchProcurements, selectProcurements } from './redux/fetch_procurements'

const importStatusContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
` 

const FAILED  = 'failed'
const IMPORTED= 'imported'
const PENDING = 'pending'

const StatusLight = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    if (status ===  FAILED) return '#D61C4E'
    if (status === IMPORTED) return '#D61C4E'
    if (status === PENDING) return '#F7F7F7'
    return '#F7F7F7'
  }};
`

function ProcurementStatusList({ procurements }) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchProcurements())
  }, [])
  
  return (
    <div>
      <List bordered>
        {
          procurements.map((procurement, index) => {
            const createdAt = new Date(procurement.created_at)
            const failedReasonObj = !!procurement.failed_reason  
              ? JSON.parse(procurement.failed_reason)
              : {}
            
            return (
              <List.Item 
                key={index} 
                index={index}
                css={css`
                  background-color: #1F2231;
                `}
              >
                <div css={importStatusContainerStyle} >
                  <div>
                    採購單名稱: { procurement.filename }
                  </div>
                  <div>
                    上傳時間: { createdAt.getFullYear() }/{ createdAt.getMonth() }/{ createdAt.getDate() } {createdAt.getHours()}:{createdAt.getMinutes()}:{createdAt.getSeconds()}
                  </div>
                  <div css={css`
                    display: flex;
                    gap: 10px;
                    align-items: center;
                  `}>
                    狀態: <StatusLight status={procurement.status} />
                  </div>
                  {
                    procurement.status === FAILED && (
                      <div> 
                        失敗原因: {failedReasonObj.err}
                      </div>
                    )
                  }
                </div>
              </List.Item>
            )
          })
        }
      </List>
    </div>
  )
}

const mapStateToProps = state => ({
  procurements: selectProcurements(state),
})

export default connect(mapStateToProps, null)(ProcurementStatusList)