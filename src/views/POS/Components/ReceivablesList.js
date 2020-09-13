import React, { useContext, useEffect, useState, Fragment } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";
import SalesStore from "../../../stores/SalesStore";
import styled from "styled-components";
// import AsyncSelect from "react-select/async";
import { observer } from "mobx-react";

const ReceivablesList = ({ canModify }) => {
  const salesStore = useContext(SalesStore);
  const {
    payNow,
    getReceivables,
    receivables: data,
    fetchSavedInvoice,
    invoices,
  } = salesStore;
  const [filterText, setFilterText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const filteredItems = data.filter(
    (item) =>
      item.order_no &&
      item.order_no.toLowerCase().includes(filterText.toLowerCase())
  );
  useEffect(() => {
    getReceivables();
  }, []);
  console.log({ filteredItems });

  const handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, "");
    setInputValue(val);
    return val;
  };
  const loadOptions = (inputdata) => {
    fetchSavedInvoice(inputdata);
  };
  const TextField = styled.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;

    &:hover {
      cursor: pointer;
    }
  `;

  const ClearButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-item: center;
    justify-content: center;
  `;
  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filter by invoice number"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        {" "}
        x{" "}
      </ClearButton>
    </>
  );

  const columns = [
    {
      name: "Order",
      selector: "order_no",
      sortable: true,
    },
    {
      name: "fullname",
      selector: "fullname",
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: "email",
      wrap: true,
      sortable: true,
    },
    {
      name: "Phone",
      selector: "phone",
      wrap: true,
      sortable: true,
    },
    {
      name: "Date",
      selector: "sales_date",
      wrap: true,
      sortable: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          {canModify ? (
            <Button
              size="sm"
              color="success"
              onClick={(key) => {
                if (window.confirm("Pay for this item?")) {
                  pay(row.id);
                }
              }}
            >
              <i className="fa fa-money"></i>
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  const pay = (id) => {
    payNow(id);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);
  return (
    <Fragment>
      <Row>
        {/* <Col md="12">
          <FormGroup>
              <Label>Search Paid Orders</Label>
              <AsyncSelect
                 cacheOptions
                 loadOptions={invoices}
                 onInputChange={handleInputChange} 
               />
               
          </FormGroup>
          </Col> */}
        <Col md="12">
          <DataTable
            title="Receivable Sales"
            columns={columns}
            data={filteredItems}
            pagination={true}
            theme="solarized"
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(ReceivablesList);
