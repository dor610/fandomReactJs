import style from "./profile.module.css";
import MediaElement from "../basics/MediaElement";
import { useEffect, useState } from "react";
import { miliSecToDateOnly } from "../../util/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faItunesNote, faSpotify, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

const BasicInfo = () =>{

    const data = useSelector(state => state.profile.profile.basicInfo);
    const links = useSelector(state => state.profile.profile.links);

    return (
        <>
        {data? 
        <div className={style.basicInfo}>
            <div>
                <MediaElement description={data.avatar.description} src={data.avatar} type="IMAGE"/>
            </div>
            <div>
                <div>{data.altName}</div>
                <div>
                    <div>Tên đầy đủ: </div>
                    <div>{data.name}</div>
                </div>
                <div>
                    <div>Ngày sinh: </div>
                    <div>{miliSecToDateOnly(data.dateOfBirth)}</div>
                </div>
                <div>
                    <div>Nguyên quán: </div>
                    <div>{data.placeOfBirth}</div>
                </div>
                <div>
                    <div>Năm hoạt động: </div>
                    <div>{data.yearActive}</div>
                </div>
                <div>
                    <div>Nghề nghiệp: </div>
                    <div>{data.occupation}</div>
                </div>
                <div>
                    <div>Dòng nhạc: </div>
                    <div>{data.genres}</div>
                </div>
                <div>
                    <div>Vợ: </div>
                    <div>{data.spouse}</div>
                </div>
                <div>
                    <div>Con: </div>
                    <div> {data.children}</div>
                    </div>
                    <div>
                        <div>Liên kết đến Ed Sheeran </div>
                        <div>
                            <a title="Ed Sheeran's Official Website" href={links[0]} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon title="Ed Sheeran's Official Website" icon={faEquals} />
                            </a>
                            <a title="Facebook" href={links[3].url} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon title="Facebook"  icon={faFacebook} />
                            </a>
                            <a title="Twitter" href={links[6].url} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon title="Twitter" icon={faTwitter} />
                            </a>
                            <a title="Instagram" href={links[4].url} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon title="Instagram" icon={faInstagram} />
                            </a>
                            <a title="Youtube" href={links[5].url} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon title="Youtube" icon={faYoutube} />
                            </a>
                            <a title="Spotify" href={links[1].url} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon title="Spotify" icon={faSpotify} />
                            </a>
                            <a title="Apple Music" href={links[2].url} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon title="Apple Music" icon={faItunesNote} />
                            </a>
                        </div>
                    </div>
            </div>
        </div>: <></>}</>
    )
}

export default BasicInfo;