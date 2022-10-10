import styled from 'styled-components'

const HomeStyle = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  background: url('/bg.jpg') no-repeat center/cover;
`

const Home = ({ children }: any) => {
  return <HomeStyle>{children}</HomeStyle>
}

export default Home
