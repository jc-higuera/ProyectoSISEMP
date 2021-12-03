import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartLine,
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import axios from "axios";

import {
  CounterWidget,
  CircleChartWidget,
  BarChartWidget,
  TeamMembersWidget,
  ProgressTrackWidget,
  RankingWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
  AcquisitionWidget,
} from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import calculate_leads_category from "../../scripts/calculate_category";

const URL = "https://gist.githubusercontent.com/jecanizarez/d02d54e96571c6e2f24aa49ce399cfdf/raw/b3a23a1643a22798570be3f8501a76c85115b8d5/Data_42Hacks.json"

export default () => {
  const [data, setData] = useState([]);
  const [totaldata, setTotalData] = useState([]);


  useEffect(() => {
          getData()
  }, []);

  const getData = async () => {
    const result = await axios(URL);

    setTotalData(result.data);
    setData(result.data)
  }
  function filterData(hackname){
      let list_to_return = []
      if(hackname === "all"){
          setData(totaldata)
          return
      }
      totaldata.forEach(d => {
          if(d.hackname === hackname ){
            list_to_return.push(d)
          }

      })
      setData(list_to_return)
      console.log(data)
  }
  function getOrigin(originData){
    let counters = {};
    for (let index = 0; index < originData.length; index++) {
      const element = originData[index];
      if(element.leadOrigin in counters){
        counters[element.leadOrigin] += 1;
      }else{
        counters[element.leadOrigin] = 1;
      }
      
    }
    let originList = [];
    let i = 0;
    for(let key in counters){
      let origin = {id: i, label: key, value: counters[key], color:"primary"};
      originList.push(origin);
      i++;
    }
    return originList;
  }

  function country(data) {
    let jsonCountry1 = [];
    let i = 1;
    data.forEach((x) => {
      let bool = false;
      jsonCountry1.forEach((y) => {
        if (y.label == x.country) {
          y.value++;
          bool = true;
        }
      });
      if (!bool) {
        jsonCountry1.push({ id: i, label: x.country, value: 1 });
        i++;
      }
    });
    jsonCountry1 = jsonCountry1.sort((x, y) => {
      var x1 = x["value"];
      var y1 = y["value"];
      return x1 < y1 ? 1 : x1 > y1 ? -1 : 0;
    });

    let t = jsonCountry1.slice(0, 7);

    let elem = 0;

    let j = jsonCountry1
      .slice(7, jsonCountry1.length)
      .forEach((x) => (elem += x.value));

    t.push({ label: "Others", value: elem });

    let h = 1;

    t.forEach((x) => {
      x.id = i;
      i++;
    });
    return t;
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">

        <img src="https://i.ibb.co/gtHd61r/unnamed-3.png" border="0"  width="6%" height="auto" alt="Logo 42hacks"></img>
        <a href='https://app.42hacks.com/#/memberlogin'><Button variant="outline-danger" size="sm">42Hacks Login</Button></a>
        <a href='https://www.42hacks.com/fridays'><Button variant="outline-info" size="sm">Friday Invites</Button></a>
      </div>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        < select
            onChange={e => filterData(e.target.value)}
            className="form-select"
            style={{width:200}} >
            <option value="all">All</option>)
            <option value="Prepare2Shift">Prepare2Shift</option>)
            <option value="Fill the GAP">Fill the GAP</option>)
            <option value="Ramp-up">Ramp-up</option>)
            <option value="Ideators">Ideators</option>)
            <option value="Make it better!">Make it better!</option>)
        </select >

    </div>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">

          <SalesValueWidget
            title="Participants"
            value={data}
          />

        </Col>

        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        
        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CircleChartWidget title="Origin country" data={country(data)} />
        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CircleChartWidget
            title="Hack Share"
            data={getOrigin(data)} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable leads={data} />
                </Col>
                <Col xs={12} lg={6} className="mb-4"></Col>

                <Col xs={12} lg={6} className="mb-4"></Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4"></Col>

                <Col xs={12} className="px-0 mb-4"></Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget leads={data} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
