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
      isLoading: false,
      timeLineData: []
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

   let quill = new Quill("#editor-container", {
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
            console.log("result", data.result);
            this.setState({
              timeLineData: data.result
            });
          }
        } else {
          console.log("connected failed");
        }
      });
  }

  async getText(e) {
    e.preventDefault();
    let quill = new Quill("#editor-container");
    const getTextValue = quill.getContents();
    let obj ={};
    let dataArray = [];
    let attribute={};
    getTextValue.ops.map(item => {
        if(item.hasOwnProperty("attributes")){
            attribute = {
                bold: item.attributes.bold ? item.attributes.bold : false,
                italic: item.attributes.italic ? item.attributes.italic : false
            }
        }
        obj= {
            description: item.insert,
            attributes: attribute ? attribute : null,
       }
       dataArray.push(obj); 
    });
    await this.setState({
      data: dataArray
    })
    await this.handleSubmit();
  }

  async handleSubmit() {
    this.setState({
      isLoading: true
    });
    const data = {
      data: this.state.data
    };
    await fetch("http://localhost:8000/timeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => {
          debugger;
          if (data.status == 200) {
            this.setState({
              description: "",
              isLoading: false
            });
            let quill = new Quill("#editor-container");
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
          <Row className={`${this.state.isLoading ? "py-1" : "py-5"}`}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-right">
              <Button onClick={e => this.getText(e)}>Save</Button>
            </Col>
          </Row>
        </Strip>
        {this.state.timeLineData.length > 0 ? (
          <TimeLineComponent data={this.state.timeLineData} />
        ) : null}
      </RenderPage>
    );
  }
}

export default QuillTextEditor;
