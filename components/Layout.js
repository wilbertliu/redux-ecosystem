import Head from "next/head"

import Header from "./Header"
import FilterMenu from "./FilterMenu"
import SortMenu from "./SortMenu"

const Layout = props => (
  <div>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,700"
        rel="stylesheet"
      />
    </Head>
    <Header />
    <FilterMenu />
    <div className="main">
      <SortMenu />
      {props.children}
    </div>
    <style jsx global>{`
      html body {
        margin: 0;
        padding: 0;
        font-family: "Lato", sans-serif;
      }

      .main {
        margin: 1rem 15% 1rem 20%;
        padding: 5px 20px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 15px;
        background-color: #eff1f3;
      }
    `}</style>
  </div>
)

export default Layout
