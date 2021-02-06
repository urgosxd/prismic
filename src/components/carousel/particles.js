import React from "react"
import { ItemCarrousel_00 , Button_00} from "./atoms"
import {makeStyles} from "@material-ui/styles"
const useStylesDivCarrousel_00 = makeStyles({})
export const DivCarrousel_00 = ({ele})=>{
    console.log(ele)
    return(
        <div className="divCarousel">
        <ItemCarrousel_00 url={ele.image}/>
        <div>
        <span className="title">{ele.titulo}</span>
        <Button_00 to={`${ele.slug}`}/>
        </div>
        </div>
    )
}
