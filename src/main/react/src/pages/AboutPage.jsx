
const AboutPage = () => {
    return (
        <div className="container" id="about">
            <div className="child">
            <h1>Witaj na naszej stronie!</h1>
            <h2>Oferujemy profesjonalne usługi drukowania i oprawiania plakatów</h2>
            <p>Nasz serwis specjalizuje się w wysokiej jakości drukowaniu plakatów oraz ich oprawianiu w eleganckie
                ramki. Dzięki naszemu doświadczeniu i zaangażowaniu możesz być pewien, że Twoje plakaty zostaną
                wykonane z najwyższą starannością i dbałością o detale.</p>
            <p>Jesteśmy godnym zaufania partnerem, ponieważ:</p>

            <p> * Posiadamy długoletnie doświadczenie w branży. </p>
            <p> * Stosujemy najnowocześniejsze technologie drukarskie.</p>
            <p> * Oferujemy szeroki wybór wysokiej jakości ram do oprawiania plakatów.</p>
            <p> * Nasi pracownicy to profesjonaliści z pasją do swojej pracy.</p>
            <p> * Zapewniamy szybką i sprawna dostawę zamówionych produktów.</p>

            <p>Ceny naszych usług są uczciwe i konkurencyjne, aby każdy mógł cieszyć się pięknymi
                plakatami
                w
                atrakcyjnych ramach bez obawy o wysokie koszty.</p>
            <p>Dołącz do grona naszych zadowolonych klientów już dziś!</p>
            <br/>
            <p></p>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="QUWM57VSTC8M4"/>
                <input type="image" src="https://www.paypalobjects.com/pl_PL/PL/i/btn/btn_donateCC_LG.gif" border="0"
                       name="submit" title="PayPal - The safer, easier way to pay online!"
                       alt="Przekaż darowiznę za pomocą przycisku PayPal"/>
                <img alt="" border="0" src="https://www.paypal.com/pl_PL/i/scr/pixel.gif" width="1" height="1"/>
            </form>
            </div>
        </div>
    );
}

export default AboutPage;