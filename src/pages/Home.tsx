import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/store";
import {selectFilters} from "../redux/filters/types";
import {setActiveCategory, setCurrentPage, setFilters, setSelectedSort} from "../redux/filters/slice";
import {selectItems, selectStatus} from "../redux/pizzas/selectors";
import {fetchPizzaItems} from "../redux/pizzas/slice";
import {Categories, Pagination, PizzaBlock, PizzaSkeleton, Sorting} from "../components";

export type SortItem = {
    text: string,
    param: string,
    name: string
}

let Home: React.FC = () => {
    //
    // import('../utils/math').then((file => {
    //     console.log(file.math(2, 3, 4, 5))
    // }))

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const sortArr: SortItem[] = [
        {text: 'популярности', param: 'rating&order=desc', name: 'rating'},
        {text: 'цене', param: 'price&order=asc', name:'price'},
        {text: 'алфавиту', param: 'title&order=asc', name: 'title'}
    ]

    const {selectedSort, activeCategory, currentPage, searchValue} = useSelector(selectFilters)
    const pizzas = useSelector(selectItems)
    const status = useSelector(selectStatus)

    const [sortingIsOpen, setSortingIsOpen] = React.useState(false)
    const [urlVisibility, setUrlVisibility] = useState(false)

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            console.log(sortArr.findIndex(el => el.name === params.sortBy))

            dispatch(setFilters({
                activeCategory: Number(params.category),
                currentPage: Number(params.page),
                selectedSort: sortArr.findIndex(el => el.name === params.sortBy)
            }))
        }

    }, [])



    React.useEffect(() => {
        if (urlVisibility) {
            const queryString = qs.stringify({
                sortBy: sortArr[selectedSort].name,
                page: currentPage,
                category: activeCategory
            })
            navigate(`?${queryString}`)
        }
        console.log(isMounted.current)
        isMounted.current = true
        setUrlVisibility(true)
    }, [currentPage, selectedSort, activeCategory])


    React.useEffect(() => {

        if (!isSearch.current) {
            dispatch(fetchPizzaItems({currentPage, activeCategory, selectedSort}))
            isSearch.current = false
            window.scrollTo(0, 0)
        }


    }, [selectedSort, activeCategory, currentPage, searchValue])

    const getSortArr = React.useCallback(() => {
        return sortArr
    }, [])

    const onChangeCategory = React.useCallback((id: number) => {
        console.log(id)
        dispatch(setActiveCategory(id))
    }, [])

    const onSelectSort = React.useCallback((index: number) => {
        dispatch(setSelectedSort(index))
        setSortingIsOpen(false)
    }, [])

    const onChangeCurrentPage = (val: number) => {
        dispatch(setCurrentPage(val))
    }


    return <>
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} onChangeCategory={onChangeCategory} />
                <Sorting getSortArr={getSortArr} selectedSort={selectedSort} onSelectSort={onSelectSort} setSortingIsOpen={setSortingIsOpen}
                         sortingIsOpen={sortingIsOpen}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ?
                    (<>
                        <h1 className="error__title">Простите, произошла ошибка при получении информации о пиццах <span>😕</span></h1>
                        <h3 className="error__subtitle">Повторите попытку позже</h3>
                    </>)
                    : (
                        <div className="content__items">
                            {
                                status === 'loading' ? (<>
                                    <PizzaSkeleton/>
                                    <PizzaSkeleton/>
                                    <PizzaSkeleton/>
                                    <PizzaSkeleton/>
                                </>)
                                : pizzas.filter((obj: any) => obj.title.toLowerCase().includes(`${searchValue.toLowerCase()}`)).map((obj: any) => (
                                        <PizzaBlock key={obj.id} {...obj} />))
                            }

                        </div>
                    )
            }

            <Pagination onChangeCurrentPage={onChangeCurrentPage} currentPage={currentPage}/>
        </div>
    </>
}

export default Home