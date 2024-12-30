import "./stylecomponents/credito.css"

function Credito({ nome, url }) {

    return(
    <div className = 'credito'>
        <span><a href={url}>{nome}</a></span>
    </div>

    )
}

export default Credito;