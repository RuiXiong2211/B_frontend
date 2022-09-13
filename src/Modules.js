import React, { useState, useEffect } from "react";
import { Card, Col, Row, Divider} from "antd";
import axios from "axios";

function Modules(props) {
  const [module, setModule] = useState([]);
  const dataUrl =
    "https://asia-southeast1-taskb4.cloudfunctions.net/gcp-function-Test";
  const fetchData = async () => {
    const res = await axios({
      method: "GET",
      url: dataUrl,
    });
    return res.data;
  };
  useEffect(() => {
    async function fetch() {
      const response = await fetchData();
      setModule(response);
    }
    fetch();
  }, []);
  return (
    <>
    <Divider> AY2022 Semester 2 CS4K Modules </Divider>
      <Row gutter={16}>
        {module.map((mod, index) => (
          <Col span={8} key={index}>
            <Card title={mod.moduleCode + " " + mod.title} bordered={true}>
              {mod.prereqs}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Modules;
