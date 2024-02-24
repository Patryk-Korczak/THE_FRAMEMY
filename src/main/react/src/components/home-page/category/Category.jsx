import './category.css'
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const CategoryCard = ({title, desc, img}) => {

    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={desc}
                    onClick={()=> navigate("/shop")}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

const Category = () => {
    const categories = [
        {title: "BESTSELLERY", desc: "Najbardziej popularne", img: "https://img.freepik.com/free-vector/poster-black-friday_1057-2608.jpg"},
        {title: "ZWIERZĘTA", desc: "Plakaty zwierzęce: Ożyw klimat wnętrza", img: "https://img.freepik.com/free-photo/sportive-dog-performing-lure-coursing-competition_155003-42635.jpg"},
        {title: "MODA", desc: "Moda: Twój wyraz osobowości", img: "https://img.freepik.com/free-photo/beautiful-slim-woman-black-dress-posing-with-pleasure-old-narrow-street_197531-3223.jpg"},
        {title: "MAPY", desc: "Mapy: Świat w zasięgu ręki", img: "https://img.freepik.com/free-vector/vintage-theme-drawing-world-map_52683-26577.jpg"},
        {title: "NATURA", desc: "Natura: Piękno bez granic", img: "https://img.freepik.com/free-photo/beautiful-tree-middle-field-covered-with-grass-with-tree-line-background_181624-29267.jpg"},
        {title: "GRY", desc: "Gry: Przygoda czeka na Ciebie", img: "https://img.freepik.com/free-photo/man-neon-suit-sits-chair-with-neon-sign-that-says-word-it_188544-27011.jpg"},
        {title: "SPORT", desc: "Sport: Aktywuj swoje życie", img: "https://img.freepik.com/free-photo/young-goalkeeper-soccer-man-isolated-academy-soccer-team_1150-14668.jpg"},
    ]
    return (
        <div className="container-fluid categories">
            <h1 className={"text-center"}>SZEROKI WYBÓR KATEGORII</h1>
            <div className="row">
                {categories.map(({title, desc, img}) => <CategoryCard title={title} desc={desc} img={img}/>)}
            </div>
        </div>
    );
}

export default Category