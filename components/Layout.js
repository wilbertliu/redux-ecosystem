import Head from "next/head"

import MainNav from "./MainNav"
import SortMenu from "./SortMenu"
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
        position: relative;
        display: grid;
        grid-template-columns: repeat(12, [col-start] 1fr);
        grid-gap: 20px;
      }

      .wrapper > * {
        grid-column: col-start / span 12;
      }

      .main {
        grid-column: col-start 3 / span 9;
        grid-row: 2;
        padding: 5px 20px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
        background-color: #eff1f3;
      }
    `}</style>
  </div>
)

export default Layout