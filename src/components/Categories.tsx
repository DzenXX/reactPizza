import React from "react";
import {selectActiveCategory, setActiveCategory} from "../redux/slices/filtersSlice";
import {useDispatch, useSelector} from "react-redux";

let Categories = () => {

    const dispatch = useDispatch()
    const activeCategory = useSelector(selectActiveCategory)


    let categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


    return (
        <div className="categories">
            <ul>
                { categories.map((text, i) => (<li key={i} onClick={() => dispatch(setActiveCategory(i)) } className={activeCategory === i ? 'active' : ''}>{text}</li>) ) }
            </ul>
        </div>
    )
}

export default Categories