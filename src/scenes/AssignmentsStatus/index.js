import { css } from '@emotion/react'

const containerStyle = css`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 4fr;
`

// TODOs: 
// Fetch all assignments along with it's inventory exported status.
function AssignmentsStatus() {
  return (
    <div css={containerStyle}>
      <div css={css`
        display: flex;
        justify-content:center;
        align-items: center;
      `}>
        <h2> 出庫狀態 </h2>
      </div>
      
    </div>
  )
}

export default AssignmentsStatus 