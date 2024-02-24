import './carousel.css'

const Carousel = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                        className="active" aria-current="true" aria-label="Slide 1"/>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"/>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"/>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://img.freepik.com/free-psd/glued-poster-mockup_47618-83.jpg?t=st=1708720956~exp=1708724556~hmac=1a4e9a583ed6f15da883b6158a15952a97125f501feaac9b748d4f0fd292236d&w=1800" className="d-block w-100" alt="ez"/>
                </div>
                <div className="carousel-item">
                    <img src="https://img.freepik.com/free-psd/glued-poster-mockup_47618-74.jpg?t=st=1708721057~exp=1708724657~hmac=a896be01afed7eb66e43863abb18f7a363198fb743b0821a54e146ec36ad85c4&w=1800" className="d-block w-100" alt="essa"/>
                </div>
                <div className="carousel-item">
                    <img src="https://img.freepik.com/free-vector/realistic-crumpled-poster-effect_23-2148432783.jpg?t=st=1708721252~exp=1708724852~hmac=d63b32f57547ca5d79f0bc8b8c086fc75b00c9772be2cae4c551a964c50e7353&w=1800" className="d-block w-100" alt="1"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"/>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;