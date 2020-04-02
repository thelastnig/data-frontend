import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';

class MainPage extends Component {  
  
  state = {
    result: null,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const apiTarget = 'http://127.0.0.1:5000/process';
    axios.get(apiTarget)
    .then(response => {
      console.log(response.data.split('<script>')[1].replace('</script>', ''))
      // this.setState({
      //   result: response.data
      // })
      const script = document.createElement("script");

      script.src = response.data.split('<script>')[1].replace('</script>', '');
      script.async = true;

      document.body.appendChild(script);
    })
    .catch(error => {
      console.log(error);
    });
  }


  render(){
    // const { result } = this.state;
    // const temp = {__html: result};
    return (
      <Container>
        Main
        {/* <div dangerouslySetInnerHTML={temp}></div> */}
        <div id='THIS_IS_FIGID'></div>
      </Container>
    )
  }
}

export default MainPage

const Container = styled.div`
  width: 100%;
`