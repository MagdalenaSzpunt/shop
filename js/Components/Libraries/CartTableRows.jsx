import React from 'react'
import { Link } from 'react-router'

class CartTableRows extends React.Component {
    render() {
        return <tr>
            <td>
                <img className="mini-photo" src={this.props.photo} alt="Zdjęcie" />
            </td>
            <td>
                <span className="name">
                    {this.props.name}
                </span>
                <span className="price">
                    ({this.props.price} PLN)
                </span><br/>
                <span className="quantity">
                  Amount: {this.props.quantity}
                </span>
                <div className="sum">
                Summary:
                  <span className="productSum">
                    {this.props.productSum}
                  </span>
                </div>
                <button onClick={this.props.deleteButton} data-id={this.props.id}
                      className='btn btn-info show-product-button'>
                      Delete
                </button>
            </td>
        </tr>
    }
}

export default CartTableRows
