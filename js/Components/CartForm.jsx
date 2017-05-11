import React from 'react'
import config from '../config.js'
import AdditionalCartForm from './Libraries/AdditionalCartForm.jsx'
import {hashHistory} from 'react-router'

class CartForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            surname: "",
            street: "",
            local: '',
            postcode: '',
            city: '',
            payment: '',
            paymentMethods: [
                'card', 'transfer'
            ],
            invoice: false,
            nip: '',
            companyName: '',
            extraInfo: '',
            sent: false,
            timeToRedirect:5
        }
    }

    handleNameChange = event => {
        this.setState({name: event.target.value})
    }
    handleSurnameChange = event => {
        this.setState({surname: event.target.value})
    }
    handleStreetChange = event => {
        this.setState({street: event.target.value})
    }
    handleLocalChange = event => {
        this.setState({local: event.target.value})
    }
    handlePostCodeChange = event => {
        this.setState({postcode: event.target.value})
    }
    handleCityChange = event => {
        this.setState({city: event.target.value})
    }
    handlePaymentChange = event => {
        this.setState({payment: event.target.value})
    }
    handleInvoiceChange = event => {
        this.setState({invoice: event.target.checked})
    }
    handleNipChange = event => {
        this.setState({nip: event.target.value})
    }
    handleCompanyNameChange = event => {
        this.setState({companyName: event.target.value})
    }
    handleExtraInfoChange = event => {
        this.setState({extraInfo: event.target.value})
    }
    handleFormSumbit = event => {
        event.preventDefault()
        fetch(config.apiUrl + '/createOrderFromCart', {
          method: 'POST',
          body: JSON.stringify({
            cartId: this.props.params.items
          })
        })
        .then(response => response.json())
        .then(responseJson =>{
          this.setState({
            sent: true
          })
          let inter = setInterval(() =>{
            this.setState({
              timeToRedirect: this.state.timeToRedirect -1
            },()=>{
              if(this.state.timeToRedirect === 0) {
                clearInterval(inter)
                localStorage.removeItem('cart')
                hashHistory.push('/')
              }
            })
          },1000)
        }
        )
    }


    render() {
      if (this.state.sent) {
        return <div className='row text-center'>
        <h1> DANKE SHUN!! </h1>
        <p> You will be redirect to hell in {this.state.timeToRedirect}</p>
        </div>
      }
        return (
            <div className='row'>
                <div className='col-md-12 col-sm-12 form-group text-center'>
                    <h2>Insert data for shipment</h2>
                    <form onSubmit={this.handleFormSumbit}>
                    <div className='col-md-6'>
                        <div className='col-md-12 form-group'>
                            <input
                            type='text'
                            placeholder='name'
                            className='form-control'
                            onChange={this.handleNameChange}/>
                        </div>
                        <div className='col-md-12 form-group'>
                            <input
                            type='text'
                            placeholder='Street'
                            className='form-control'
                            onChange={this.handleStreetChange}/>
                        </div>
                        <div className='col-md-12 form-group'>
                            <input
                            type='text'
                            placeholder='Postcode'
                            className='form-control'
                            onChange={this.handlePostCodeChange}/>
                        </div>
                        <div className='col-md-12 form-group'>
                            <select className='form-control' onChange={this.handlePaymentChange}>
                                {this.state.paymentMethods.map((element, index) => {
                                    return (
                                      <option key={index}>
                                        {element}
                                    </option>
                                  )
                                })
                                }
                            </select>
                        </div>
                        {
                          this.state.invoice ? <AdditionalCartForm
                          handleNipChange={this.handleNipChange}
                          handleCompanyNameChange={this.handleCompanyNameChange} /> : null
                        }

                    </div>
                    <div className='col-md-6'>
                        <div className='col-md-12 form-group'>
                            <input
                            type='text'
                            placeholder='Surname'
                            className='form-control'
                            onChange={this.handleSurnameChange}/>
                        </div>
                        <div className='col-md-12 form-group'>
                            <input
                            type='text'
                            placeholder='number/local'
                            className='form-control'
                            onChange={this.handleLocalChange}/>
                        </div>
                        <div className='col-md-12 form-group'>
                            <input
                            type='text'
                            placeholder='City'
                            className='form-control'
                            onChange={this.handleCityChange}/>
                        </div>
                        <div className='col-md-12 form-group'>
                            <input type='checkbox' onChange={this.handleInvoiceChange}/>
                            Invoice
                        </div>
                        <div className='col-md-12 form-group'>
                            <textarea
                            placeholder='More info'
                            className='form-control'
                            onChange={this.handleExtraInfoChange}/>
                        </div>
                        <div className='col-md-12 form-group'>
                            <button
                            type='submit'
                            className='btn btn-warning pull-right'>
                            CONFIRM</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default CartForm
