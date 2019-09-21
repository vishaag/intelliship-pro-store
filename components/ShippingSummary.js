import { Button, Segment, Divider, Dropdown, Table, Form, Radio, Image, Label } from 'semantic-ui-react'


export default ({
  deliveryDetails,
  getPricesButtonDisabled,
  handleChange,
  countries,
  selectedCountry,
  handleShipping,
  shippingButtonActive,
  shippingButtonHandle,
  fromShipping,
  countrySelected,
  packingPictures,
  display_price: {
    with_tax: { amount, currency, formatted }
  },
}) => (
  <React.Fragment>
    <Divider />
    <Segment clearing size="large">
      <strong>Shipping Details</strong>

        <div></div>
        <br></br>
        Shipping From
        <Dropdown
            fluid
            search
            selection
            options={fromShipping}
            defaultValue='Singapore'
          />
        <br></br>
        Shipping To 
        <Dropdown
            fluid
            search
            selection
            options={countries}
            value = {selectedCountry}
            onChange={handleChange}
          />
          <br></br>
        <Button
        color="black" floated="right" onClick={() => handleShipping()} disabled={getPricesButtonDisabled}>
          Get Shipping Prices 
        </Button> 
        <br></br>
        <br></br>

      {countrySelected && 
      (
        <div>
      <Table celled structured>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Delivery Name</Table.HeaderCell>
          <Table.HeaderCell>Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Shipping Cost</Table.HeaderCell>
          <Table.HeaderCell>Select</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {deliveryDetails.map(deliveryDetail => 
        <Table.Row>
          <Table.Cell>{deliveryDetail.deliveryName}</Table.Cell>
          <Table.Cell>{deliveryDetail.deliveryDate}</Table.Cell>
          <Table.Cell>${deliveryDetail.price}</Table.Cell>
          <Table.Cell>          
            <Form.Field>
              <Radio
                name='radioGroup'
                value={deliveryDetail.deliveryName}
                checked={shippingButtonActive == deliveryDetail.deliveryName}
                onChange={shippingButtonHandle}
                price={deliveryDetail.price}
              />
          </Form.Field>
        </Table.Cell>

        </Table.Row>)}
      </Table.Body>
      </Table>
      <Label  color='yellow' ribbon>
          Note
      </Label>
      Your package will be packed in the following manner to minimize shipping cost! 
      <br></br>
      <br></br>
      <div>
      {packingPictures.map(item =>
            <div>
              <Image src={item.img} size='small' verticalAlign='middle' /> 
                <Label pointing='left'>{item.dimensions}</Label>
                <Label size = 'medium' color='black'>{item.name}</Label>
              <Divider />     
            </div>     
      )}
      </div>
      </div>
      )
    }
    

    </Segment>
      

  </React.Fragment>

)
