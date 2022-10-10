import styled from 'styled-components'

export const Navbar = styled.div`
  background-color: red;
  width: 100%;
  height: 64px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;

  .link {
    display: inline-block;
    color: #fff;
    padding: 3px 10px;
    text-decoration: none;
    transition: all 0.3s;
  }
  .link:hover {
    background-color: #fff;
    color: #000;
  }
`
