import Dropdown from "./Dropdown/Dropdown"
import database from "../database.json"
import SortMenu from "./SortMenu"

const SideMenu = () => (
  <div className="sortNav">
    <Dropdown categories={database.categories.map(x => x)} />
    <SortMenu />
    <style jsx>{`
      .sortNav {
        grid-row: 2;
        grid-column: col-start / span 2;
        font-size: 1rem;
        font-weight: 300;
        top: 25px;
        position: -webkit-sticky;
        position: sticky;
        box-sizing: border-box;
        height: 80vh;

        display: flex;
        flex-direction: column;
      }
    `}</style>
  </div>
)

export default SideMenu
