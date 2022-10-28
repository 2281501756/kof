import styled from 'styled-components'

export const LoginWrapper = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 360px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
  }
  h1 {
    text-align: center;
  }
  .item {
    width: 100%;
    height: 36px;
    margin: 10px;
    text-align: center;
    input {
      height: 100%;
      outline: none;
    }
  }
  button {
    width: 40%;
    height: 100%;
  }
`
