import s from './NotFound.module.css'

let NotFound = () => {
    return (
        <div className="container">
            <div className={s.wrapper}>
                <div className={s.smile}>😕</div>
                <h1>Ничего не найдено</h1>
                <h4 className={s.subtitle}>На нашем сайте страницы с таким адресом не существует</h4>
            </div>
        </div>
    )
}
export default NotFound