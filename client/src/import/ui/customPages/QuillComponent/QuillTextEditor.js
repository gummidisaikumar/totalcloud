import React from "react";
import Quill from "quill";
import { Row, Col, Button } from "reactstrap";
import RenderPage from "../../customComponent/RenderPage/RenderPage";
import Strip from "../../customComponent/Strip/Strip";
import TimeLineComponent from "../TimeLineComponent/TimeLineComponent";
import Loading from "../../customComponent/Loading/Loading";

class QuillTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      description: "",
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getText = this.getText.bind(this);
    this.getTimeLineData = this.getTimeLineData.bind(this);
  }

  async componentDidMount() {
    var toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"], //'strike'
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      //[{ 'script': 'sub'}, { 'script': 'super' }],
      // [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ direction: "rtl" }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"]
    ];

    new Quill("#editor-container", {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Compose an epic...",
      theme: "snow", // or 'bubble',
      scrollingContainer: "#scrolling-container"
    });
    //  quill.setText('Hello Good World!');
    await this.getTimeLineData();
  }

  getTimeLineData() {
    fetch("http://localhost:8000/timeline", {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          if (data.result.length > 0) {
            this.setState({
              data: data.result
            });
          }
        } else {
          console.log("connected failed");
        }
      });
  }

  async getText(e) {
    e.preventDefault();
    const quill = new Quill("#editor-container");
    const getTextValue = quill.getContents();
    console.log("getText", getTextValue);
    await getTextValue.ops.map(item => {
      this.setState({
        description: item.insert
      });
    });
    this.handleSubmit();
  }

  async handleSubmit() {
    this.setState({
      isLoading: true
    });
    const data = {
      description: this.state.description
    };
    await fetch("http://localhost:8000/timeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        debugger;
        if (data.status == 200) {
          this.setState({
            description: "",
            isLoading: false
          });
          const quill = new Quill("#editor-container");
          quill.setText("");
          this.getTimeLineData();
        } else {
          this.setState({
            description: "",
            isLoading: false
          });
          console.log("connected failed");
        }
      });
  }

  render() {
    console.log("sadsd", this.state.data);
    return (
      <RenderPage
        className="render-page render-no-page"
        containerType="container-fluid"
      >
        <Strip className="strip strip--short" containerType="container">
          <Row className="quill__container">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <div id="editor-container"></div>
            </Col>

            {this.state.isLoading ? (
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className="text-center"
              >
                <Loading />
              </Col>
            ) : null}
          </Row>
          <Row className={`${this.state.isLoading ? "py-2" : "py-5"}`}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-right py-2">
              <Button onClick={e => this.getText(e)}>Save</Button>
            </Col>
          </Row>
        </Strip>
        {this.state.data.length > 0 ? (
          <TimeLineComponent data={this.state.data} />
        ) : null}
      </RenderPage>
    );
  }
}

export default QuillTextEditor;
