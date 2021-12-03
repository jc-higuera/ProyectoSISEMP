
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import axios from 'axios';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";


const URL = "https://gist.githubusercontent.com/jecanizarez/d02d54e96571c6e2f24aa49ce399cfdf/raw/16ad8b5e8ef94feb969f7c41ff81a8c9507fb7c3/Data_42Hacks.json"

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    const result = await axios(
      URL,
    );

    setData(result.data);
  }
  console.log(data);
  function getOrigin(originData){
    let counters = {};
    for (let index = 0; index < originData.length; index++) {
      const element = originData[index];
      if(element.hackname in counters){
        counters[element.hackname] += 1;
      }else{
        counters[element.hackname] = 1;
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
  console.log(getOrigin(data))
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">

        <img src="https://i.ibb.co/gtHd61r/unnamed-3.png" border="0"  width="8%" height="auto" alt="Logo 42hacks"></img>
        <a href='https://app.42hacks.com/#/memberlogin'><Button variant="outline-danger" size="sm">42Hacks Login</Button></a>
        <a href='https://www.42hacks.com/fridays'><Button variant="outline-info" size="sm">Friday Invites</Button></a>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="New users this week"
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
          <CircleChartWidget
            title="Traffic Share"
            data={trafficShares} />
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
                  <PageVisitsTable leads={data}/>
                </Col>
                <Col xs={12} lg={6} className="mb-4">
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">

                </Col>

                <Col xs={12} className="px-0 mb-4">

                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget
                  leads={data} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
