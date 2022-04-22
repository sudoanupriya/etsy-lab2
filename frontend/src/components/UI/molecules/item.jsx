import * as React from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import Typography from '@mui/material/Typography';



const CONSTANTS = require('../../../config/constants.json');

const ItemCard = ( props ) => {
    const {item} = props
    console.log("INSIDE ITEMCARD",item);
    const IMAGE_URL = CONSTANTS.baseUrl + CONSTANTS.port + CONSTANTS.API.ITEM.GETDP.replace("{key}", item.displayPicture);

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={ IMAGE_URL }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.description}
                        <div>Quantity: {item.quantity}</div>
                        <div>Price: {item.price}</div>
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        {item.favourited && <FavoriteIcon sx={{ color: "red" }} />}
                        {!item.favourited && <FavoriteBorderOutlinedIcon sx={{ color: "red" }} />}
                    </IconButton>
                    <div>
                        <IconButton onClick={alert("increment")} aria-label="increment">
                            <AddCircleOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={alert("decrement")} aria-label="decrement">
                            <RemoveCircleOutlinedIcon />
                        </IconButton>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
}

export default ItemCard;