import style from "./basic.module.css";
import MediaElement from "./MediaElement";

const MediaViewer = ({images, video, type, isViewed = false, arr= false}) =>{
    let classStyle = "";
    console.log(images);
    if(images){
        if(arr){
            if(images.length === 2) classStyle = style.twoMedia;
            if(images.length > 2) classStyle = style.multiMedia;
        }else{
            if(Object.keys(images).length === 2) classStyle = style.twoMedia;
            if(Object.keys(images).length > 2) classStyle = style.multiMedia;
        }
    }

    return (
        <>
        {images?<div className={style.mediaViewer + " " + classStyle}>
            { arr? images.map((img, i) =>{
                return <MediaElement src={img} description={img.description} isViewed={isViewed} type={"IMAGE"} key={"media_"+ i} />
            }) :
            Object.keys(images).map((img, i) =>{
                return <MediaElement src={images[img]} description={images[img].description} isViewed={isViewed} type={"IMAGE"} key={"media_"+ i} />
            })}       
        </div>: <></>}
        
        {video? <div className={style.videoViewer}>
            <MediaElement src={video} description={video.description} isViewed={isViewed}  type={"VIDEO"} />
        </div>: <></>}
        </>    
    )
}

export default MediaViewer;