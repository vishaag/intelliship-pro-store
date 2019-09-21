import { Button, Segment, Divider, Dropdown, Icon, Label, Menu, Table } from 'semantic-ui-react'


export default ({
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
        <div>{optimizedPacking}</div>


  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Delivery Name</Table.HeaderCell>
        <Table.HeaderCell>Delivery Date</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

    </Segment>
      

  </React.Fragment>

)
