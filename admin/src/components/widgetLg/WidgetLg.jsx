import { useEffect, useState } from "react";
import "./widgetLg.css";

import axios from "axios";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [orders , setOrders] = useState();
  useEffect(()=>{
    const getOrders = async()=>{
      try {
        const res = await axios.get("http://localhost:5000/api/orders/");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      };
    };
    getOrders();
  }, [setOrders]);
  // console.log(orders);
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders?.map((item)=>(
           <tr className="widgetLgTr">
           <td className="widgetLgUser">
             <img
               src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
               alt=""
               className="widgetLgImg"
             />
             <span className="widgetLgName">{item.userId}</span>
           </td>
           <td className="widgetLgDate">{item.createdAt}</td>
          <td className="widgetLgAmount">{item.amount}</td>
           <td className="widgetLgStatus">
             <Button type={item.status} />
           </td>
         </tr>
        ))}

        
      </table>
    </div>
  );
}
