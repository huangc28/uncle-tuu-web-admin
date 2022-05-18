import { Grid, Row, Col } from 'rsuite';

function Seperator() {
  return (
    <Grid fluid> 
      <Row>
        <Col xs={2} />
        <Col xs={20}>
          <hr />
        </Col>
        <Col xs={2} />
      </Row>
    </Grid>
  )
}

export default Seperator