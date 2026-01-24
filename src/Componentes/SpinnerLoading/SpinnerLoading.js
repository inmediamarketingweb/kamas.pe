import './SpinnerLoading.css';

function SpinnerLoading(){
    return(
        <div className='spinner-loading-container'>
            <div className='spinner-loading'>
                <span className='loader'></span>

                <p>Cargando...</p>
            </div>
        </div>
    )
}

export default SpinnerLoading;
