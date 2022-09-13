import "antd/dist/antd.css";
import  Notes from "./Notes";
import styled from "styled-components";
import Modules from "./Modules";

const Title = styled.h1`
  text-align: center;
  padding: 10px;
`

function App() {
  return (
    <>
      <Title>Save your notes here</Title>
      <Notes />
      <Modules />
    </>
  );
}

export default App;
