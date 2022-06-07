import { useEffect, useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { List, Divider } from 'rsuite';
import { GoTriangleRight, GoTriangleDown } from 'react-icons/go';

import loadingStatus from 'Atuu/constants/loading_status' 

import { 
  fetchExportStatus, 
  selectAssignments, 
  selectFetchExportLoadingStatus,
} from './redux/fetch_export_status'
import { Available, NotDelivered, NotYetReported, Delivered } from './constants'

const containerStyle = css`
  padding: 20px;
`
const assignmentContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const productsContainerLabelStyle = css`
  cursor: pointer;  
`

const ProductsContainerStyle = styled.div`
  display: ${props => {
    if (props.hide) return 'none' 
    return 'block'
  }};
` 

const ReportStatusLabel = {
  [NotDelivered]: '沒到貨',
  [NotYetReported]: '尚未回報',
  [Delivered]: '已到貨',
}


function ExportStatus({ assignments, fetchExportsLoadingStatus }) {
  const dispatch = useDispatch() 
  useEffect(() => {
    dispatch(fetchExportStatus())
  }, [])
  
  const [toggleStates, setToggleStates] = useState([])

  useEffect(() => {
    if (fetchExportsLoadingStatus === loadingStatus.SUCCESS) {
      // Hide all product box when first loaded
      setToggleStates(
        Object.keys(assignments).map(() => true)
      )    
    }
  }, [fetchExportsLoadingStatus])
  
  const toggleProdsBox = indexToToggle => {
    toggleStates[indexToToggle] = !toggleStates[indexToToggle]
    setToggleStates([...toggleStates]) 
  }
  
  return (
    <div css={containerStyle}>
      <div css={css`
        display: flex;
        justify-content:center;
        align-items: center;
      `}>
        <h2> 出庫狀態 </h2>
      </div>
      
      <Divider />

      {/* Assignments */}
      <div>
        <List bordered>
          {
            Object.keys(assignments).map((assignmentUUID, assignmentIndex) => {
              const assignment = assignments[assignmentUUID]
              const createdAt = new Date(assignment.createdAt)
              
              return (
                <List.Item 
                  key={assignmentIndex} 
                  index={assignmentIndex}
                  css={css`
                    background-color: #1F2231;
                  `}
                >
                  <div css={assignmentContainerStyle}>
                    <div>
                      出庫對象: {assignment.assigneeName}
                    </div>
                   
                    <div>
                      預約時間: { createdAt.getFullYear() }/{ createdAt.getMonth() }/{ createdAt.getDate() } {createdAt.getHours()}:{createdAt.getMinutes()}:{createdAt.getSeconds()}
                    </div>
                    
                    <div 
                      css={productsContainerLabelStyle}
                      onClick={() => toggleProdsBox(assignmentIndex)}
                    >
                      <span>
                        {
                          toggleStates[assignmentIndex]
                            ? <GoTriangleRight /> 
                            : <GoTriangleDown />
                        }
                        
                        要出庫的貨
                      </span>
                    </div>

                    <ProductsContainerStyle 
                      hide={toggleStates[assignmentIndex]}
                    >
                      <List bordered>
                        {
                          assignment.stocks.map((stock, idx) => (
                            <List.Item
                              key={idx}
                              css={css`
                                background-color: #1F2231;
                              `}
                            >
                              <div>
                                遊戲名稱: { stock.gameName }
                              </div>
                              
                              <div>
                                商品名稱: { stock.prodName }
                              </div>
                              
                              <div>
                                庫存 ID: { stock.stockUUID }
                              </div>
                              
                              <div>
                                出庫狀態:
                                { 
                                  stock.available === Available 
                                    ? ' 尚未出庫' 
                                    : ' 已經出庫'
                                } 
                              </div>
                              
                              <div>
                                用戶回報: {ReportStatusLabel[stock.delivered]}
                              </div>
                            </List.Item>
                          ))
                        }
                      </List>
                    </ProductsContainerStyle>
                  </div>
                </List.Item>  
              )

            })
          }
        </List>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  assignments: selectAssignments(state),
  fetchExportsLoadingStatus: selectFetchExportLoadingStatus(state),
})

export default connect(mapStateToProps, null)(ExportStatus) 