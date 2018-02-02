import Head from "next/head"

import MainNav from "./MainNav"
import FilterMenu from "./FilterMenu"
import MainHeader from "./MainHeader"

const Layout = props => (
  <div>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,700"
        rel="stylesheet"
      />
    </Head>
    <MainNav />
    <div className="wrapper">
      <FilterMenu />
      <div className="main">
        <MainHeader header={props.header} />
        {props.children}
      </div>
    </div>
    <style jsx global>{`
      html body {
        margin: 0;
        padding: 0;
        font-family: Lato, sans-serif;
      }

      .wrapper {
        display: grid;
        grid-template-columns: 1fr 75% 10%;
        grid-template-rows: 30px 1fr;
        height: 100%;
        position: relative;
      }

      .main {
        grid-row: 2;
        padding: 5px 20px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 15px;
        background-color: #eff1f3;
      }
    `}</style>
  </div>
)

export default Layout
