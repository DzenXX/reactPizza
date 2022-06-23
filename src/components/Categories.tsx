import React from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

interface CategoriesProps {
    onChangeCategory: (id: number) => void,
    activeCategory: number
}

export const Categories: React.FC<CategoriesProps> = React.memo(({ activeCategory, onChangeCategory }) => {

    useWhyDidYouUpdate('Categories', { onChangeCategory })

    let categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


    return (
        <div className="categories">
            <ul>
                { categories.map((text, i) => (<li key={i} onClick={() => onChangeCategory(i) } className={activeCategory === i ? 'active' : ''}>{text}</li>) ) }
            </ul>
        </div>
    )
})
