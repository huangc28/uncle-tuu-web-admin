import { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { 
  FlexboxGrid, 
  Form, 
  ButtonToolbar,
  Button,
  Divider,
} from 'rsuite'
import { css } from '@emotion/react'

import loadingStatus from 'Atuu/constants/loading_status'

import StockItem from './components/StockItem'
import { 
  fetchGames,
  selectFetchGamesError,
  selectFetchGamesState,
  selectGames,
} from './redux/fetch_games'
import { 
  fetchProducts, 
  selectProducts, 
  selectFetchProdsStatus, 
  selectFetchProdsError,
} from './redux/fetch_product'

const containerStyle = css`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 3fr;
`

const formContainerStyle = css`
  padding: 20px;
  display: flex;
  justify-content: center;
`
// selector data example: 
// data={[
//   {
//     label: "Eugenia",
//     value: "Eugenia",
//     role: "Master",
//   }
// ]}
const initFormValue = {
  gamepicker: 'Eugenia',
  productpicker: 'Eugenia',
}

const gameIDToReadableName = {
  

}

/* 
  Input text: userid
    Game name ---> auto populate game item ID supported at the moment
    Game item ID ---> auto populate quanity
    quantity
    submit button
*/
function ExportStock({ 
  fetchGamesStatus, 
  fetchGamesError, 
  games,

  fetchProdsStatus,
  fetchProdsError,
  products,
}) {
  // set default game / product list
  const [gameList, setGameList] = useState([])
  const [productList, setProductList] = useState([])
  const [formValue, setFormValue] = useState({})
  const dispatch = useDispatch()
  
  // Load list of games
  useEffect(() => {
    dispatch(fetchGames())
  }, [])
  
  useEffect(() => {
    if (loadingStatus.SUCCESS === fetchGamesStatus) {
      setGameList(games)
    }

    if (loadingStatus.FAILED === fetchGamesStatus) {
      console.log('failed to load games', fetchGamesError)
    }
  }, [fetchGamesStatus])

  useEffect(() => {
    if (loadingStatus.SUCCESS === fetchProdsStatus) {
      setProductList(products)
    }

    if (loadingStatus.FAILED === fetchProdsStatus) {
      console.log('failed to load games', fetchGamesError)
    }

  }, [fetchProdsStatus])

  const handleSubmit = () => {
    console.log('handleSubmit')
  }

  const handleChangeGame = v => {
    // Clear product list to prevent wrongful setting.
    setProductList([])

    if (!v || v.length === 0) {
      return
    }
    
    // Dispatch event to load available products
    dispatch(fetchProducts({ gameBundleID: v }))
  }

  return (
    <div>
      <div css={containerStyle}>
        <FlexboxGrid justify='center'>
          <FlexboxGrid.Item
            colspan={8} 
            css={css`text-align:center`}
          >
            <h2>
              預約出庫
            </h2>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div> 

      {/* Export Form */}
      <div css={formContainerStyle}>
        <Form 
          onSubmit={handleSubmit}
          formValue={formValue}
        >
          <Form.Group controlId="username">
            <Form.ControlLabel>用戶名</Form.ControlLabel>
            <Form.Control name="username" />
            <Form.HelpText>用戶名為必填</Form.HelpText>
          </Form.Group>
        
          <div>
            <StockItem 
              onChangeGame={handleChangeGame}  
              onChangeProduct={handleChangeProduct}  
              gameList={gameList}
              productList={productList}
            />
          </div>

          <Divider/>

          <Form.Group>
            <ButtonToolbar>
              <Button type='submit' appearance="primary">提交</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>      
      </div>
      
    </div>
  )
}

const mapStateToProps = (state, _) => {
  return {
    fetchGamesStatus: selectFetchGamesState(state),
    fetchGamesError: selectFetchGamesError(state),
    games: selectGames(state),
    
    fetchProdsStatus: selectFetchProdsStatus(state),
    fetchProdsError: selectFetchProdsError(state),
    products: selectProducts(state),
  }
}

export default connect(mapStateToProps, null)(ExportStock) 