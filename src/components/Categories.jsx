import React from "react";

function Categories() {

    const [activeIndex, setActiveIndex] = React.useState(0)

    let categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    let onClickCategory = (index) => {
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                { categories.map((text, i) => (<li key={i} onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''}>{text}</li>) ) }
            </ul>
        </div>
    )
}

export default Categories