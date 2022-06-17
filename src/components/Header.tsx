import logo from "../assets/img/pizza-logo.svg";
import {Link, useLocation} from "react-router-dom";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import debounce from 'lodash.debounce'
import {selectSearchValue, setSearchValue} from "../redux/slices/filtersSlice";
import {selectCart} from "../redux/slices/cartSlice";

let Header: React.FC = () => {

    const dispatch = useDispatch()

    const inputRef = useRef<HTMLInputElement>(null)

    const searchValue = useSelector(selectSearchValue)

    const [inputValue, setInputValue] = React.useState('')

    const location = useLocation()

    const onCrossClick = () => {
        setSearchValue('')
        inputRef.current?.focus()
    }

    let changeSearchValue = React.useCallback(
        debounce((event) => {
            dispatch(setSearchValue(event.target.value))
            console.log(location)
            console.log(searchValue)
            console.log(event.target.value)
        }, 500), []
    )
    let {totalPrice, totalCount} = useSelector(selectCart)


    let onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        changeSearchValue(e)
    }

    return (
        <div className="header">
            <div className="container">
                <Link to='/'>
                    <div className="header__logo">
                        <img width="38" src={logo} alt="Pizza logo"/>
                        <div>
                            <h1>React Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                <div className="search">
                    <input value={inputValue} ref={inputRef} onChange={(event) => onChangeValue(event)}
                           className='input' placeholder={'Введите название пиццы'} type="text"/>
                    <div className='loop'>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/>
                            <path
                                d="M20.56,18.44l-4.67-4.67a7,7,0,1,0-2.12,2.12l4.67,4.67a1.5,1.5,0,0,0,2.12,0A1.49,1.49,0,0,0,20.56,18.44ZM5,10a5,5,0,1,1,5,5A5,5,0,0,1,5,10Z"
                                fill="#464646"/>
                        </svg>
                    </div>
                    {searchValue != '' ? <div onClick={() => onCrossClick()} className="cross">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/>
                            <path
                                d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.21,11.79a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-1.79,1.8a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12l-1.8-1.79a1,1,0,0,1,1.42-1.42L12,10.59l1.79-1.8a1,1,0,0,1,1.42,1.42L13.41,12Z"
                                fill="#464646"/>
                        </svg>
                    </div> : ''}
                </div>
                {
                    location.pathname !== '/cart' &&
                    <div className="header__cart">
                        <Link to="/cart" className="button button--cart">
                            <span>{totalPrice} ₽</span>
                            <div className="button__delimiter"></div>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                    stroke="white"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                                    stroke="white"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                                    stroke="white"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>{totalCount}</span>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header