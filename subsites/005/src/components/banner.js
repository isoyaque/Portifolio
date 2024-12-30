import "./stylecomponents/banner.css"
import Credito from "./credito";


function Banner() {
    return (

        <div className='banner'>
            <h1>Santos</h1>

            <Credito nome='Foto por Krooze' url='https://krooze.com.br/' />
        </div>


    )
}

export default Banner;