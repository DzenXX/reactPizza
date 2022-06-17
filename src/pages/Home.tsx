import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import React from "react";
import Pagination from "../components/Pagination/Pagination";
import {selectFilters, setCurrentPage, setSelectedSort} from "../redux/slices/filtersSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchPizzaItems, selectItems, selectStatus} from "../redux/slices/pizzasSlice";

type SortItem = {
    text: string,
    param: string,
}

let Home: React.FC = () => {

    const {selectedSort, activeCategory, currentPage, searchValue} = useSelector(selectFilters)

    const dispatch = useDispatch()


    const sortArr: SortItem[] = [
        {text: 'популярности', param: 'sortBy=rating&order=desc'},
        {text: 'цене', param: 'sortBy=price&order=asc'},
        {text: 'алфавиту', param: 'sortBy=title&order=asc'}
    ]


    const pizzas = useSelector(selectItems)
    const status = useSelector(selectStatus)


    const [sortingIsOpen, setSortingIsOpen] = React.useState(false)



    React.useEffect(() => {
        console.log('jghjkjhkv')
       // @ts-ignore
        dispatch(fetchPizzaItems({
            currentPage,
            activeCategory,
            sortArr,
            selectedSort,
        }))

        window.scrollTo(0, 0)
    }, [selectedSort, activeCategory, currentPage, searchValue])



    const onSelectSort = (index: number) => {
        dispatch(setSelectedSort(index))
        setSortingIsOpen(false)
    }
    const onChangeCurrentPage = (val: number) => {
        dispatch(setCurrentPage(val))
    }

    return <>
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sorting onSelectSort={onSelectSort} sortArr={sortArr} setSortingIsOpen={setSortingIsOpen}
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