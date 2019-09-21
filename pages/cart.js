import Layout from '../components/Layout'
import CartItemList from '../components/CartItemList'
import CartSummary from '../components/CartSummary'
import ShippingSummary from '../components/ShippingSummary'
import { Table } from 'semantic-ui-react'



import {
  getCartItems,
  removeFromCart,
  checkoutCart,
  payForOrder
} from '../lib/moltin'

export default class Cart extends React.Component {
  state = {
    items: [],
    loading: true,
    completed: false,
    optimizedPacking: '',
    selectedCountry : '',
    getPricesButtonDisabled : true,
    countryOptions : [
      { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
      { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
      { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
      { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
      { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
      { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
      { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
      { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
      { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
      { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
      { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
      { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
      { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
      { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
      { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
      { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
      { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
      { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
      { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
      { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
      { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
      { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
      { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
    ]
  }



  async componentDidMount() {
    const cartId = await localStorage.getItem('mcart')
    const { data, meta } = await getCartItems(cartId)

    this.setState({
      items: data,
      meta,
      cartId,
      loading: false
    })
  }

  _handleCheckout = async data => {
    const cartId = await localStorage.getItem('mcart')
    const customerId = localStorage.getItem('mcustomer')

    const {
      id: token,
      email,
      card: {
        name,
        address_line1: line_1,
        address_city: city,
        address_country: country,
        address_state: county,
        address_zip: postcode
      }
    } = data

    const customer = customerId ? customerId : { name, email }

    const address = {
      first_name: name.split(' ')[0],
      last_name: name.split(' ')[1],
      line_1,
      city,
      county,
      country,
      postcode
    }

    try {
      const {
        data: { id }
      } = await checkoutCart(cartId, customer, address)
      await payForOrder(id, token, email)

      this.setState({
        completed: true
      })
    } catch (e) {
      console.log(e)
    }
  }

  

  _handleShipping = async data => {

    var productSpecs = {
      // in grams
      '3bc57a05-e56b-42cc-b27b-f00068ed1748' : {
        'weight': 500,
        'l' : 50,
        'b' : 50,
        'h' : 40
      },
      '666241c8-c9eb-41dc-828e-bc20e111a348' : {
        'weight': 400,
        'l' : 40,
        'b' : 40,
        'h' : 40
      },
    }

    console.log(this.state.items)

    //construct GET request URL
    var url = 'http://intelliship-server.glitch.me/getOptimizedPacking?'

    
    var urlParams = ''
    this.state.items.forEach((element) => {
      urlParams += element.id + '=' + element.quantity + '&'
    })
    url = url + urlParams
    console.log(url)

    //Optimizer API
    const optimizerResponse = await fetch(url);
    var optimizedPacking = await optimizerResponse.json();

    console.log(optimizedPacking)
    this.setState({
      optimizedPacking: optimizedPacking.response.bins_packed[0].bin_data.id
    })

    // Weight Calculator
    var grossWeight = 0
    var volumetricWeight = 0;
  
  


    // Calculate Product Weight
    this.state.items.forEach((element) => {
      // console.log(element)
      console.log(productSpecs[element.id])
      grossWeight += productSpecs[element.id].weight
    })


    var packingData = optimizedPacking.response.bins_packed[0].bin_data

    volumetricWeight = (packingData.w * packingData.h * packingData.d)/5000

    console.log(packingData)
    console.log(grossWeight)
    console.log(volumetricWeight)

    // make call to LEO's api passing

    var prices = [{
      deliveryName : 'UPS',
      deliveryDate : '25-Sep',
      price : '25$'
    }]
  }


  _handleRemoveFromCart = async itemId => {
    const { items, cartId } = this.state
    const { data, meta } = await removeFromCart(itemId, cartId)

    this.setState({
      items: data,
      meta
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ 
      selectedCountry: value,
      getPricesButtonDisabled : false
    })

    console.log(value)
  }


  render() {
    const { meta, ...rest } = this.state
    const { loading } = rest

    return (
      <Layout title="Cart">
        <CartItemList {...rest} removeFromCart={this._handleRemoveFromCart} />
        {!loading && !rest.completed && (
          <ShippingSummary {...meta} handleShipping={this._handleShipping} 
          optimizedPacking={this.state.optimizedPacking}
          countries = {this.state.countryOptions}
          selectedCountry = {this.state.selectedCountry}
          handleChange = {this.handleChange}
          getPricesButtonDisabled = {this.state.getPricesButtonDisabled}/>
        )}
        {!loading && !rest.completed && (
          <CartSummary {...meta} handleCheckout={this._handleCheckout} />
        )}

      </Layout>
    )
  }
}
