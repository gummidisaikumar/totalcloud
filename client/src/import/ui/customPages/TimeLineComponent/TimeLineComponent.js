import React from "react";
import { Row, Col } from "reactstrap";
import {
  Timeline,
  Content,
  ContentYear,
  ContentBody,
  Description
} from "vertical-timeline-component-react";
import Strip from "../../customComponent/Strip/Strip";
import { getDateWithMonthName } from "../../utilies/displayFormator";

class TimeLineComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Strip className="strip strip--short" containerType="container">
        <Row className="py-2">
          <Col>
            <Timeline>
              {this.props.data.map((item, index) => (
                <Content key={index}>
                  <ContentYear year="" />
                  <ContentBody
                    title={`${getDateWithMonthName(item.createdOn)}`}
                  >
                    <Description text={`${item.description}`} optional="" />
                  </ContentBody>
                </Content>
              ))}
            </Timeline>
          </Col>
        </Row>
      </Strip>
    );
  }
}

export default TimeLineComponent;
