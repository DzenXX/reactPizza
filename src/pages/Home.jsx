import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import React from "react";
import axios from "axios";


let Home = () => {

    const [pizzas, setPizzas] = React.useState([])

    const [loading, setLoading] = React.useState([true])

    React.useEffect(() => {
        getPizza('')
    }, [])

    let getPizza = (param) => {
        setLoading(true)
        axios.get(`https://627f8941be1ccb0a466137de.mockapi.io/api/reactPizza/items${param}`).then(response => {
            setPizzas(response.data)
            setLoading(false)
        })
    }

    return <>
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sorting getPizza={getPizza}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    loading
                        ? (<>
                            <PizzaSkeleton/>
                            <PizzaSkeleton/>
                            <PizzaSkeleton/>
                            <PizzaSkeleton/>
                            <PizzaSkeleton/>
                        </>)
                        : pizzas.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))

                }
            </div>
        </div>
    </>
}

export default Home