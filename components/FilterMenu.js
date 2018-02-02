import Link from 'next/link'
import CategoriesList from './CategoriesList'

const FilterMenu = () => (
    <div className="filterNav">
        <span> Search Resources </span>
        <input />
        <h5>Categories</h5>
        <select>
        </select>
        <h5>Subcategories</h5>
        <select id="subcategories">
            <option value="volvo">Action Reducer Generators</option>
            <option value="actions">actions</option>
            <option value="actions">apps and examples</option>
            <option value="actions">component data fetching preloading</option>
        </select>
        <style jsx>{`
        .filterNav {
            margin: 10px 25px;
            height: 100%; 
            width: 15%;
            position: fixed;
            z-index: 1; 
            top: 0;
            left: 0;
            padding-top: 5%;
        }

        h5 {
            margin-bottom: 3px;
        }
        
        select {
            padding-top: 10px;
            width: 100%
        }

        input {
            width: 100%;
        }

        ul li {
            list-style: none;
            margin: 0;
        }
      `}</style>
    </div>
)

export default FilterMenu