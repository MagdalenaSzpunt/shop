import React from 'react'
import config from '../config.js'
import {Link, IndexLink} from 'react-router'


class Template extends React.Component{
  componentDidMount() {
    localStorage.removeItem('cart')
      if (!localStorage.getItem('cart')) { // localStorage jest obiektem, ktory ma funkcje getItem, i tam szuka 'cart'
          fetch(config.apiUrl + '/createCart')
              .then(response => response.json())
              .then(responseJson => {
                  localStorage.setItem('cart', responseJson.id)
              })
      }
  }


render(){
 return <div>
   <nav className="navbar navbar-default">
       <div className="container-fluid">
           <div className="navbar-header">
           <Link class="navbar-brand" to="http://rajdtukan.pl/wp-content/uploads/2017/01/a8.jpg">
           <img alt="Brand" src="http://rajdtukan.pl/wp-content/uploads/2017/01/a8.jpg" />
          </Link>
               <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                   <span className="sr-only">Toggle navigation</span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
               </button>
               <IndexLink className="navbar-brand" to="/">Membraines</IndexLink>
           </div>

           <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
               <ul className="nav navbar-nav">
                   <li>
                     <Link to="/products">Products<span className="sr-only">(current)</span></Link>
                   </li>
                   <li><Link to="/orders">Order</Link></li>
                   <li><Link to="/contact">Contact</Link></li>
               </ul>
               <ul className="nav navbar-nav navbar-right">
                   <li>
                   <Link to={"/cart/" + localStorage.getItem("cart")}>
                         <i className='glyphicon glyphicon-shopping-cart'></i>
                   </Link>
                   </li>
               </ul>
           </div>
       </div>
   </nav>
   <div className="container">
      {this.props.children}
   </div>
   <footer className="navbar navbar-inverse navbar-fixed-bottom">
      <div className="container-fluid text-center">
          Copyright &copy; 2017. Created by Magdalena Szpunt
      </div>
   </footer>
 </div>

}
}

export default Template
