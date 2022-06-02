import { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { 
  FlexboxGrid, 
  Form, 
  ButtonToolbar,
  Button,
  IconButton,
  Divider,
} from 'rsuite'
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import MinusRoundIcon from '@rsuite/icons/MinusRound';

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
import {
  assignStocks,
  selectAssignStockStatus,
  selectAssignStockError,
} from './redux/assign_stocks'

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

const errorMessageStyle = css`
  color: #B00020;
`

const successMessageStyle = css`
  color: #5FD068;
`
// selector data example: 
// data={[
//   {
//     label: "Eugenia",
//     value: "Eugenia",
//     role: "Master",
//   }
// ]}
// const initFormValue = {
//   gamepicker: 'Eugenia',
//   productpicker: 'Eugenia',
// }

const stockSelectionTemplate = {
  gameBundleID: null,
  prodID: null,
  quantity: 0, 
  error: null,
  products: [],
}

const formValueTemplate = {
  username: '',
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

  assignStockError,
  assignStockStatus
}) {
  // set default game / product list
  const [gameList, setGameList] = useState([])
  const [focusStock, setFocusStock] = useState(0)
  const [stockSelections, setStockSelections] = useState([
    Object.assign({}, stockSelectionTemplate)
  ])
  const [formValue, setFormValue] = useState(Object.assign({}, formValueTemplate))
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
      setStockSelections(
        stockSelections.map((selection, idx) => {
          if (idx === focusStock) {
            return {
              ...selection,
              products
            }
          }

          return selection
        })
      )
    }

    if (loadingStatus.FAILED === fetchProdsStatus) {
      console.log('failed to load games', fetchGamesError)
    }

  }, [fetchProdsStatus])
  
  const handleChangeGame = (v, idx) => {
    // Change stock setting at idx 
    setStockSelections(
      stockSelections.map((stockSelection, origIdx) => {
        if (origIdx === idx) {
          return {
            ...stockSelection,
            gameBundleID: v,
          }
        }      
        
        return stockSelection
      })
    )

    if (!v || v.length === 0) {
      return
    }
    
    // Dispatch event to load available products
    dispatch(fetchProducts({ gameBundleID: v }))
  }
  const handleChangeProduct = (v, idx) => {
    setStockSelections(
      stockSelections.map((stockSelection, origIdx) => {
          if (origIdx === idx) {
            return {
              ...stockSelection,
              prodID: v,
            }
          }      
        
          return stockSelection
      })
    )
  }
  
  const handleChangeQuantity = (v, idx) => {
    setStockSelections(
      stockSelections.map((stockSelection, origIdx) => {
          if (origIdx === idx) {
            return {
              ...stockSelection,
              quantity: +v,
            }
          }      
        
          return stockSelection
      })
    )
  }

  const handleChangeForm = v => {
    setFormValue({
      ...formValue,
      ...v
    })
  }
  
  const handleAddStockRow = () => {
    setStockSelections(
      stockSelections
        .concat({...stockSelectionTemplate})
    )
  }
  
  const handleRemoveStockRow = () => {
    setStockSelections(stockSelections.slice(0, stockSelections.length-1))
  }

  const validateSelections = selections => {
    const res = selections.map(({ gameBundleID, prodID, quantity, products }) => {
      let error = null
      
      if (gameBundleID === null || gameBundleID.length === 0) error = new Error('沒選遊戲')  
      if (prodID === null || prodID.length === 0) error = new Error('沒選商品')  
      if (quantity < 1) error = new Error('沒選數量')  
       
      
      return {
        gameBundleID,
        prodID,
        quantity,
        error,
        products
      } 
    })  

    
    setStockSelections(res)
    return !res.some(selection => selection.error !== null)
  }
  
  const handleSubmit = () => {
    // - Validate each row and assign error message.
    // - Retrieve user and stock info here. Normalize data to only things to need to send to BE. 
    if (!validateSelections(stockSelections)) {
      return
    }

    dispatch(assignStocks(
      {
        formValue,
        stocks: stockSelections.map(({ gameBundleID, prodID, quantity}) => ({
          game_bundle_id: gameBundleID,
          prod_id: prodID,
          quantity, 
        })),
      }
    ))
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
          onChange={handleChangeForm}
        >
          <Form.Group controlId="username">
            <Form.ControlLabel>用戶名</Form.ControlLabel>
            <Form.Control name="username" />
            <Form.HelpText>用戶名為必填</Form.HelpText>
            <Form.ErrorMessage></Form.ErrorMessage>
          </Form.Group>
        
          <div>
            {
              stockSelections.map((selection, idx) => (
                <StockItem 
                  key={idx}
                  index={idx}
                  onChangeGame={handleChangeGame}  
                  onChangeProduct={handleChangeProduct}  
                  onChangeQuantity={handleChangeQuantity}
                  onFocus={index => setFocusStock(index)}
                  gameList={gameList}
                  productList={stockSelections[idx].products}
                  error={selection.error}
                />
              ))
            }
          </div>

          <Divider/>
          
          <div css={css`
            margin-bottom: 15px;   
            height: 15px;
          `}> 
            {
              assignStockStatus === loadingStatus.FAILED && (
                <p css={errorMessageStyle}>
                  {assignStockError}
                </p>
              )
              
            }
            
            {
              assignStockStatus === loadingStatus.SUCCESS && (
                <p css={successMessageStyle}>
                  指派成功  
                </p>
              ) 
            }

          </div>

          <Form.Group>
            <ButtonToolbar>
              <Button type='submit' appearance="primary">提交</Button>
              <IconButton 
                icon={<PlusRoundIcon />} 
                onClick={handleAddStockRow}
              />
              <IconButton
                disabled={stockSelections.length === 1}
                icon={<MinusRoundIcon />}
                onClick={handleRemoveStockRow}
              >
              </IconButton>
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
    
    assignStockStatus: selectAssignStockStatus(state), 
    assignStockError: selectAssignStockError(state),
  }
}

export default connect(mapStateToProps, null)(ExportStock) 