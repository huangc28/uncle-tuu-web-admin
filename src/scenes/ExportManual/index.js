import { FlexboxGrid } from 'rsuite'
import { css } from '@emotion/react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'

import getMarkdown from './export_markdown'
import ExportVideo from './video/IMG_7502.mov'

const containerStyle = css`
  padding: 20px 20px 32px; 
`

const textContainerStyle = css` 
  font-size: 18px;
  line-height: 1.2; 
`

const reactMarkdownStyle = css`
  p {
    font-size: 16px;
    line-height: 1.3; 
  }
  h3 {
    margin-top: 10px;
  }
`


function ExportManual() {
  return (
    <div css={containerStyle}>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item
          colspan={16}
        >
          <ReactMarkDown 
            css={reactMarkdownStyle}
            children={getMarkdown({ video: ExportVideo })}
            remarkPlugins={[remarkGfm]}                
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  )
}

export default ExportManual