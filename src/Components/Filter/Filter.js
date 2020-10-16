import React from 'react'
import "./Filter.css"
export default function Filter({ count, size, sort, sortProducts, filterProducts }) {
    return (
        <div className="filter">
            <div className="filter__result">{ count } Products</div>
            <div className="filter__sort">
                Order{" "}
                <select value={sort} onChange={sortProducts}>
                    <option value="lastest">Lastest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="filter__size">
                Filter{" "}
                <select value={size} onChange={filterProducts}>
                    <option value="">All</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
        </div>
    )
}
