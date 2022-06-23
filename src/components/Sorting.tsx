import React, {useEffect, useRef} from 'react'
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

type SortingProps = {
    onSelectSort: (i: number, obj: SortItem) => void;
    setSortingIsOpen: (val: boolean) => void,
    sortingIsOpen: boolean,
    selectedSort: number,
    getSortArr: () => SortItem[]
}
type SortItem = {
    text: string,
    param: string,
    name: string
}

export const Sorting: React.FC<SortingProps> = React.memo(({onSelectSort, setSortingIsOpen, sortingIsOpen, selectedSort, getSortArr}) => {

    let sortRef = useRef<HTMLSpanElement>(null)
    useWhyDidYouUpdate('Sorting', {onSelectSort, setSortingIsOpen, sortingIsOpen, getSortArr})



    useEffect(() => {
        let onClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setSortingIsOpen(false)
            }
        }
        document.body.addEventListener('click', onClickOutside)
        return () => document.body.removeEventListener("click", onClickOutside)
    }, [])

    return (
        <div className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span ref={sortRef}
                      onClick={() => setSortingIsOpen(!sortingIsOpen)}>{getSortArr()[selectedSort].text}</span>
            </div>
            {
                sortingIsOpen && (
                    <div className="sort__popup">
                        <ul>
                            {
                                getSortArr().map((obj, i) => (<li onClick={() => onSelectSort(i, obj)}
                                                             className={selectedSort === i ? 'active' : ''}>{obj.text}</li>))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
})


