import React, { useContext, useState, Fragment, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";
import ReportStore from "../../stores/ReportStore";
import dataHero from "data-hero";
import moment from "moment";
import SalesReport from "./Components/SalesReport";
import AssetReport from "./Components/AssetReport";
const schema = {
  start_date: {
    isEmpty: false,
    min: 1,
    message: "Start date is required",
  },
  end_date: {
    isEmpty: false,
    min: 1,
    message: "End date is required",
  },
};

const Report = () => {
  const repStore = useContext(ReportStore);
  const { getSalesReport, sales, searching, getAssetReport, assets } = repStore;
  const [formState, setFormState] = useState({
    values: { start_date: "", end_date: "" },
    touched: {},
    errors: {},
  });
  const [activeReport, setActiveReport] = useState("sales");
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.start_date.error || errors.end_date.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleReportTab = (data) => {
    if (activeReport != data) setActiveReport(data);
  };
  const dateFormat = "YYYY/MM/DD";
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    getSalesReport(formState.values);
    getAssetReport(formState.values);
  };
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <h5>Report Management</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12"></Col>
          </Row>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={{ size: 3 }} sm="12">
                <FormGroup>
                  <Label for="start_date">Start Date</Label>
                  <Input
                    type="date"
                    // value={formState.values.start_date || ''}
                    locale="fr"
                    defaultValue={
                      formState.values.start_date
                        ? moment(formState.values.start_date, dateFormat)
                        : moment()
                    }
                    name="start_date"
                    id="start_date"
                    invalid={hasError("start_date")}
                    onChange={handleChange}
                  />
                  <FormFeedback>
                    {hasError("start_date")
                      ? formState.errors.start_date &&
                        formState.errors.start_date.message
                      : null}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={{ size: 3, offset: 1 }} sm="12">
                <FormGroup>
                  <Label for="end_date">End Date</Label>
                  <Input
                    type="date"
                    // value={formState.values.end_date || ''}
                    defaultValue={
                      formState.values.end_date
                        ? moment(formState.values.end_date, dateFormat)
                        : moment()
                    }
                    name="end_date"
                    id="end_date"
                    invalid={hasError("end_date")}
                    onChange={handleChange}
                  />
                  <FormFeedback>
                    {hasError("end_date")
                      ? formState.errors.end_date &&
                        formState.errors.end_date.message
                      : null}
                  </FormFeedback>
                </FormGroup>
              </Col>

              <Col md="2" sm="12" className="mt-3">
                <Button
                  color="secondary"
                  size="sm"
                  className="float-right mt-3"
                  disabled={!formState.isValid || searching}
                  onClick={handleSubmit}
                >
                  Search Report
                </Button>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>

      <Card className="mt-2">
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              <ButtonGroup className="border border-secondary rounded">
                <Button
                  color={activeReport === "sales" ? "primary" : "dark"}
                  onClick={(e) => handleReportTab("sales")}
                >
                  Sales Report
                </Button>
                <Button
                  color={activeReport === "asset" ? "primary" : "dark"}
                  onClick={(e) => handleReportTab("asset")}
                >
                  Asset Report
                </Button>
              </ButtonGroup>
              <div className="card-block mt-2  border-right">
                <div className={activeReport === "sales" ? "active" : "d-none"}>
                  <SalesReport data={sales}  period={formState.values.start_date + " to " + formState.values.end_date}  />
                </div>
                <div className={activeReport === "asset" ? "active" : "d-none"}>
                  <AssetReport data={assets}  period={formState.values.start_date + " to " + formState.values.end_date} />
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Report);
