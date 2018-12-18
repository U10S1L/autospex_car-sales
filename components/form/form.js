import React, { Component, Fragment } from "react";
import "./form.css";
import { generateBBCode } from "../../js/bbCodeGen.js";

const FormGroup = ({
  groupSettings,
  keyPressEvents,
  labelText,
  labelAddOns,
  inputType,
  inputID,
  inputValue,
  inputPlaceholder,
  inputAddOns,
  handleFormEntry
}) => {
  const settings = { ...groupSettings };
  if (settings.linkedLabel) {
    return (
      <div className="form-group">
        <div className="input-group col-sm-auto">
          <label for={inputID}>
            <a href={labelAddOns.href} target="_blank">
              {labelText}
            </a>
          </label>
        </div>
        <div className="col-sm-9">
          <input
            type={inputType}
            id={inputID}
            value={inputValue}
            className="form-control"
            placeholder={inputPlaceholder}
            onChange={handleFormEntry}
            {...inputAddOns}
            onKeyDown={keyPressEvents}
          />
        </div>
      </div>
    );
  } else if (settings.carRank) {
    return (
      <div className="form-group">
        <div className="input-group col-3">
          <label for={inputID} {...labelAddOns}>
            {labelText}
          </label>
        </div>
        <div className="col-sm-9 radio-group radio">
          <label className="radio-inline">
            <input
              name={inputID}
              type={inputType}
              id={inputID}
              value="excellent"
              placeholder={inputPlaceholder}
              onChange={handleFormEntry}
              {...inputAddOns}
              onKeyDown={keyPressEvents}
            />
            <span style={{ color: "#00FF00" }}>Excellent</span>
          </label>
          <label className="radio-inline">
            <input
              name={inputID}
              type={inputType}
              id={inputID}
              value="fair"
              placeholder={inputPlaceholder}
              onChange={handleFormEntry}
              {...inputAddOns}
              onKeyDown={keyPressEvents}
            />
            <span style={{ color: "#FFFF00" }}>Fair</span>
          </label>
          <label className="radio-inline">
            <input
              name={inputID}
              type={inputType}
              id={inputID}
              value="low"
              placeholder={inputPlaceholder}
              onChange={handleFormEntry}
              {...inputAddOns}
              onKeyDown={keyPressEvents}
            />
            <span style={{ color: "#FF0000" }}>Low</span>
          </label>
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-group">
        <div className="input-group col-3">
          <label for={inputID} {...labelAddOns}>
            {labelText}
          </label>
        </div>
        <div className="col-sm-9">
          <input
            type={inputType}
            id={inputID}
            value={inputValue}
            className="form-control"
            placeholder={inputPlaceholder}
            onChange={handleFormEntry}
            {...inputAddOns}
            onKeyDown={keyPressEvents}
          />
        </div>
      </div>
    );
  }
};

class SalesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carName: null,
      carColor: null,
      carMiles: null,
      carDSPrice: null,
      carAutoSpexPrice: null,
      carLeftImg: null,
      carRightImg: null,
      condition: null,
      security: null,
      insurance: null,
      oocLock: null,
      oocAlarm: null,
      oocImmob: null,
      oocInsurance: null,
      oocEngine: null,
      oocBattery: null,
      sellerName: null,
      sellerNumber: null
    };
  }

  componentDidMount() {
    // fetch window storage seller.name and seller.number
    // provided option to override this.
    let myStorage = window.localStorage;
    const storage_sellerName = myStorage.getItem("sellerName");
    const storage_sellerNumber = myStorage.getItem("sellerNumber");

    if (storage_sellerName != "") {
      this.setState({ sellerName: storage_sellerName });
    }
    if (storage_sellerNumber != "") {
      this.setState({ sellerNumber: storage_sellerNumber });
    }
  }

  handleFormEntry(e) {
    const { id, value } = e.target;

    if (id == "sellerName" || id == "sellerNumber") {
      let myStorage = window.localStorage;
      myStorage.setItem(id, value);
    }

    this.setState({ [id]: value }, () => {
      console.log(id, this.state[id]);
      console.log(this.state);
    });
  }

  validate(e) {
    const { keyCode } = e;
    const invalidKeys = [69, 107, 109, 110, 187, 188, 189, 190];
    for (let i in invalidKeys) {
      if (keyCode == invalidKeys[i]) {
        e.preventDefault();
        return;
      }
    }
  }

  getBBCode() {
    let bbCode = generateBBCode(this.state);
    console.log(bbCode);
  }

  render() {
    return (
      <Fragment>
        <div id="salesForm">
          <form>
            <FormGroup
              labelText={"Car Name"}
              inputType={"Text"}
              inputID={"carName"}
              inputValue={this.state.carName}
              inputPlaceholder={"Tahoma"}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"Car Color"}
              inputType={"Text"}
              inputID={"carColor"}
              inputValue={this.state.carColor}
              inputPlaceholder={"Black"}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"Car Miles"}
              inputType={"number"}
              inputID={"carMiles"}
              inputValue={this.state.carMiles}
              inputPlaceholder={500}
              inputAddOns={({ step: "1" }, { min: "0" })}
              handleFormEntry={e => this.handleFormEntry(e)}
              keyPressEvents={e => this.validate(e)}
            />
            <FormGroup
              groupSettings={{ carRank: true }}
              labelText={"Condition"}
              inputType={"radio"}
              inputID={"condition"}
              inputValue={this.state.condition}
              inputPlaceholder={""}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              groupSettings={{ carRank: true }}
              labelText={"Security"}
              inputType={"radio"}
              inputValue={this.state.security}
              inputID={"security"}
              inputPlaceholder={""}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              groupSettings={{ carRank: true }}
              labelText={"Insurance"}
              inputType={"radio"}
              inputValue={this.state.insurance}
              inputID={"insurance"}
              inputPlaceholder={""}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"(( Lock ))"}
              inputType={"number"}
              inputID={"oocLock"}
              inputValue={this.state.oocLock}
              inputPlaceholder={"5"}
              inputAddOns={({ step: "1" }, { min: "0" }, { max: "5" })}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"(( Alarm ))"}
              inputType={"number"}
              inputID={"oocAlarm"}
              inputValue={this.state.oocAlarm}
              inputPlaceholder={"4"}
              inputAddOns={({ step: "1" }, { min: "0" }, { max: "4" })}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"(( Immob ))"}
              inputType={"number"}
              inputID={"oocImmob"}
              inputValue={this.state.oocImmob}
              inputPlaceholder={"3"}
              inputAddOns={({ step: "1" }, { min: "0" }, { max: "4" })}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"(( Insurance ))"}
              inputType={"number"}
              inputID={"oocInsurance"}
              inputValue={this.state.oocInsurance}
              inputPlaceholder={"3"}
              inputAddOns={({ step: "1" }, { min: "0" }, { max: "3" })}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"(( Engine ))"}
              inputType={"number"}
              inputID={"oocEngine"}
              inputValue={this.state.oocEngine}
              inputPlaceholder={"99"}
              inputAddOns={({ step: "1" }, { min: "0" }, { max: "100" })}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"(( Battery ))"}
              inputType={"number"}
              inputID={"oocBattery"}
              inputValue={this.state.oocBattery}
              inputPlaceholder={"100"}
              inputAddOns={({ step: "1" }, { min: "0" }, { max: "100" })}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              groupSettings={{ linkedLabel: true }}
              labelText={"Dealership Price"}
              labelAddOns={{
                href: "https://forum.ls-rp.io/viewtopic.php?f=63&t=687989"
              }}
              inputType={"number"}
              inputID={"carDSPrice"}
              inputValue={this.state.carDSPrice}
              inputPlaceholder={100000}
              inputAddOns={({ step: "1" }, { min: "0" })}
              handleFormEntry={e => this.handleFormEntry(e)}
              keyPressEvents={e => this.validate(e)}
            />
            <FormGroup
              labelText={"AutoSpex Price"}
              inputType={"number"}
              inputID={"carAutoSpexPrice"}
              inputValue={this.state.carAutoSpexPrice}
              inputPlaceholder={100000}
              inputAddOns={({ step: "1" }, { min: "0" })}
              handleFormEntry={e => this.handleFormEntry(e)}
              keyPressEvents={e => this.validate(e)}
            />
            <FormGroup
              labelText={"Left Image URL"}
              inputType={"Text"}
              inputID={"carLeftImg"}
              value={this.state.carLeftImg}
              inputPlaceholder={""}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"Right Image URL"}
              inputType={"Text"}
              inputID={"carRightImg"}
              inputValue={this.state.carRightImg}
              inputPlaceholder={""}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"Your First Name"}
              inputType={"Text"}
              inputID={"sellerName"}
              inputValue={this.state.sellerName}
              inputPlaceholder={"Julia"}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
            <FormGroup
              labelText={"Your Number"}
              inputType={"Text"}
              inputID={"sellerNumber"}
              inputValue={this.state.sellerNumber}
              inputPlaceholder={"5029"}
              handleFormEntry={e => this.handleFormEntry(e)}
            />
          </form>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.getBBCode()}
          >
            Secondary
          </button>
        </div>
      </Fragment>
    );
  }
}

export default SalesForm;
