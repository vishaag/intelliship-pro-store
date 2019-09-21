import { Button, Segment, Divider, Dropdown, Icon, Label, Menu, Table } from 'semantic-ui-react'


export default ({
  deliveryDetails,
  getPricesButtonDisabled,
  handleChange,
  optimizedPacking,
  countries,
  selectedCountry,
  handleShipping,
  display_price: {
    with_tax: { amount, currency, formatted }
  }
}) => (
  <React.Fragment>
    <Divider />
    <Segment clearing size="large">
      <strong>Shipping Details</strong>
        <Button color="black" floated="right" onClick={() => handleShipping()} disabled={getPricesButtonDisabled}>
          Get Shipping Prices 
        </Button> 
        <div></div>
        <br></br>
        <Dropdown
            fluid
            search
            selection
            options={countries}
            value = {selectedCountry}
            onChange={handleChange}
            defaultValue= 'af'
          />

      <Table celled>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Delivery Name</Table.HeaderCell>
          <Table.HeaderCell>Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Select</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {deliveryDetails.map(deliveryDetail => 
        <Table.Row>
          <Table.Cell>{deliveryDetail.deliveryName}</Table.Cell>
          <Table.Cell>{deliveryDetail.deliveryDate}</Table.Cell>
          <Table.Cell>{deliveryDetail.price}</Table.Cell>
          <Table.Cell><input type="radio" name={deliveryDetail.deliveryName} value={deliveryDetail.deliveryName}/></Table.Cell>
          

        </Table.Row>)}
      </Table.Body>
      </Table>
    

    </Segment>
      

  </React.Fragment>

)
