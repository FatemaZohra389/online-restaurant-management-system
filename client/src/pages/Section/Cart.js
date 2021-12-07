import React, { Component } from 'react'
import { Table, Container} from "react-bootstrap";
import "./Cart.css";
export class Cart extends Component {
    render() {
        return (
            <div>
                
               <h1>Shopping Cart</h1> 


               <Container>
           <Table>
  <thead>
    <tr>
      <th>Serial</th>
      <th>Id</th>
      <th>Name</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>2</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2"></td>
      <td></td>
    </tr>
  </tbody>
</Table>





               </Container>
               
            </div>
        )
    }
}

export default Cart

