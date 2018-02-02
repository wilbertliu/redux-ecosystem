import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaStar from 'react-icons/lib/fa/star';
import FaDownload from 'react-icons/lib/fa/download';

const SortMenu = () => {
    return (
        <ul className="sort-container">
            <span className="sort label"> Sort By: </span>
            <span className="buttons">
                <li className="sort-button"> <FaArrowUp size={14} /> NPM <FaDownload size={12} /> /mo  </li>
                <li className="sort-button"> <FaArrowUp size={14} /> Last Updated </li>
                <li className="sort-button"> <FaArrowDown size={14} /> Github <FaStar size={12} /> </li>
            </span>
            <input placeholder="Search..." />
            <style jsx>{`

            ul {
                display: flex;
                list-style: none;
                align-items: center;
                padding: 0;
            } 

            .buttons {
                flex: 1;
                display: flex;
            }

            li:not(.label) {
                font-weight: 200;
                margin-left: 5px;
            }

            .label {
                margin-right: 5px;
            }

            .sort-button {
                padding: 5px;
                cursor: pointer;
            }

            input {
                height: 2.4rem;
                flex: .5;
                box-sizing: border-box;
                padding: 0.5rem;
                color: #0a0a0a;
                border: 1px solid #cacaca;
                box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
                font-size: 1.2rem;
                line-height: normal;
                transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
            }

           input:focus {
                border: 1px solid #8a8a8a;
                background-color: #fefefe;
                outline: none;
                -webkit-box-shadow: 0 0 5px #cacaca;
                box-shadow: 0 0 5px #cacaca;
                -webkit-transition: -webkit-box-shadow 0.5s, border-color 0.25s ease-in-out;
                transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
            }

    `}</style>
        </ul>
    );
};

export default SortMenu;