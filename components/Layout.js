import Head from "next/head"

import MainNav from "./MainNav"
import SortMenu from "./SortMenu"
import MainHeader from "./MainHeader"

const Layout = props => (
  <div>
    <Head>
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,700"
        rel="stylesheet"
      />
    </Head>
    <div className="wrapper">
      <MainNav />
      <SortMenu topics={props.subTopics} />
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

      :root {
        --redux: #4183c4;
      }

      .wrapper {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(12, [col-start] 1fr);
        grid-gap: 10px;
      }

      .wrapper > * {
        grid-column: col-start / span 12;
      }

      .main {
        grid-column: col-start 3 / span 10;
        margin: 0 10px 0 0;
        grid-row: 2;
        padding: 5px 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
        background-color: #eff1f3;
      }
    `}</style>
  </div>
)

export default Layout
