import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";


let FullPizza: React.FC = () => {

    let navigate = useNavigate()


    let [pizza, setPizza] = React.useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>()


    let { id } = useParams()

    useEffect(() => {
        console.log(pizza)
        async function fetchPizza() {
            console.log('вызов fetchPizza')
            try {
                const { data } = await axios.get(`https://627f8941be1ccb0a466137de.mockapi.io/api/reactPizza/items/${id}`)
                setPizza(data)
            } catch (error) {
                console.log('ошибка при получение пиццы')
                alert('Не удалось найти пиццу. Нажмите "Ok", чтобы вернуться на гланую страницу')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <>Загрузка...</>
    }

    return <>
        <img src={pizza.imageUrl} alt=""/>
        <h1>{pizza.title}</h1>
        <h2>Цена: {pizza.price}₽</h2>
    </>
}

export default FullPizza