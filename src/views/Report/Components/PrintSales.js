import React, { PureComponent } from "react";
import shortId from "shortid";
import  '../st.css'

class PrintSales extends PureComponent {
  render() {
    const { report, total, period } = this.props;

    return (
      <React.Fragment>
        <div id="report-POS">
          <div style={{ textAlign: "center" }} id="top">
            <div className="logo"></div>
            <div className="info">
              <h2>{period}</h2>
            </div>
          </div>
          <div id="bot">
            <div id="table">
              <table>
                <thead>
                  <tr className="tabletitle" key={shortId.generate()}>
                    <td className="printItem">
                      <h2>Invoice </h2>
                    </td>
                    <td className="printItem">
                      <h2>Amount </h2>
                    </td>
                    <td className="printItem">
                      <h2> Date</h2>
                    </td>
                    <td className="printItem">
                      <h2>Status</h2>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {report &&
                    report.map((d) => {
                      return (
                        <tr className="service" key={shortId.generate()}>
                          <td className="tableprintItem">
                            <p className="printItemtext">{d.order_no}</p>
                          </td>

                          <td className="tableprintItem">
                            <p className="printItemtext">{d.total}</p>
                          </td>

                          <td className="tableprintItem">
                            <p className="printItemtext">{d.sales_date}</p>
                          </td>

                          <td className="tableprintItem">
                            <p className="printItemtext">{d.status}</p>
                          </td>
                        </tr>
                      );
                    })}

                  <tr className="" key={shortId.generate()}>
                    <td className="printItem"></td>
                    <td colSpan="1" className="printItem">
                      <h2>Total Amount</h2>
                    </td>
                    <td className="printItem"><h2>{total ? total : ' 0'} </h2></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="legalcopy">
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrintSales;
