import "./stylecomponents/navbar.css"


function Navbar() {
    return (
        <div className="navbar">

            <ul>
                <li id ='inicio'><p>Ínicio</p></li>
                <li id ='conheca'><p>Conheça</p></li>
                <li id ='curiosidades'><p>Curiosidades</p></li>
                <li id ='pontos'><p>Pontos turisticos</p></li>

            </ul>

        </div>
    )
}

export default Navbar;