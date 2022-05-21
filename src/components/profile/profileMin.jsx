import { Link, useNavigate } from "react-router-dom";
import style from "./profile.module.css";
import { sendGetRequest } from "../../util/utils";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faItunesNote, faSpotify, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import MediaElement from "../basics/MediaElement";

const ProfileMin = () =>{

    const navigate = useNavigate();

    const [avatar, setAvatar] = useState({url: "https://www.dropbox.com/s/wm9xcmn2z82yydi/avatar.png?raw=1"});
    const [avatarDescription, setAvatarDescription] = useState("");

    const [name, setName] = useState("");

    const [instagram, setInstagram] = useState("");
    const [officalWebsite, setOfficalWebsite] = useState("");
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");

    const [spotify, setSpotify] = useState("");
    const [appleMusic, setAppleMusic] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() =>{
        loadProfile();
    }, []);


    const openDetailPage = () => {
        navigate("/profile")
    }

    const loadProfile = async () =>{
        let res = await sendGetRequest("/profile/get/basic");
        console.log(res);
        if(res.status === 200){
            setAvatar(res.data.basicInfo.avatar);
            setAvatarDescription(res.data.basicInfo.avatar.description);
            setName(res.data.basicInfo.altName);
            setOfficalWebsite(res.data.links[0].url);
            setSpotify(res.data.links[1].url);
            setAppleMusic(res.data.links[2].url);
            setFacebook(res.data.links[3].url);
            setInstagram(res.data.links[4].url);
            setYoutube(res.data.links[5].url);
            setTwitter(res.data.links[6].url);
        }
    }

    return (
        <div className={style.containerMin}>
            <div>Thông tin</div>
            <div className={style.profileMin}>
                <div>
                    <MediaElement type={"IMAGE"} src={avatar} description={avatarDescription}/>
                    <div>{name}</div>
                </div>
                <div>
                    <a href={officalWebsite} rel="noreferrer" target="_blank">
                        <FontAwesomeIcon icon={faEquals} />
                        <div>Ed Sheeran Website</div>
                    </a>
                    <a href={facebook} rel="noreferrer" target="_blank">
                        <FontAwesomeIcon icon={faFacebook} />
                        <div>Facebook</div>
                    </a>
                    <a href={twitter} rel="noreferrer" target="_blank">
                        <FontAwesomeIcon icon={faTwitter} />
                        <div>Twitter</div>
                    </a>
                    <a href={instagram} rel="noreferrer" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} />
                        <div>Instagram</div>
                    </a>
                    <a href={youtube} rel="noreferrer" target="_blank">
                        <FontAwesomeIcon icon={faYoutube} />
                        <div>Youtube</div>
                    </a>
                    <a href={spotify} rel="noreferrer" target="_blank">
                        <FontAwesomeIcon icon={faSpotify} />
                        <div>Spotify</div>
                    </a>
                    <a href={appleMusic} rel="noreferrer" target="_blank">
                        <FontAwesomeIcon icon={faItunesNote} />
                        <div>Apple Music</div>
                    </a>
                </div>
               
                <div onClick={openDetailPage}>
                    Chi tiết
                </div>
            </div>
        </div>
    )
}

export default ProfileMin;