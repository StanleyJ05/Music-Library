import { useState,useEffect } from 'react';
import{useParams } from 'react-router-dom';



export default function ArtistView() {
    const {id} = useParams()
    const [artistData, setArtistData] = useState([])

    return(
        <div>
            <h2> The ID passed was: {id}</h2>
            <p>Artist Data goes Here</p>
        </div>
    )
}