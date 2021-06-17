
import React, { Fragment, useEffect, useState, useRef } from "react";
export function Home() {
	const BASE_URL = "https://assets.breatheco.de/apis/sound/";
	const [songs, setSongs] = useState([]);
	const [songAudio, setSongAudio] = useState("");
    const [paintedSongs, setPaintedSongs] = useState();
    const audioTag = useRef();
	useEffect(() => {
		fetch(BASE_URL.concat("songs"))
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(responseAsJson => {
				setSongs(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
    }, []);
    
	useEffect(() => {
		setPaintedSongs(
			songs.map((song, index) => {
				return (
					<li
						id={index}
						key={index.toString()}
						onClick={() => {
                            setSongAudio(song.url);
						}}>
						{song.name}
					</li>
				);
			})
		);
    }, [songs]);
    const playSong = () => {
        audioTag.current.play();
    }
    const puseSong = () => {
        audioTag.current.pause();
    }
	return (
		<>
			<audio autoPlay ref={audioTag} src={BASE_URL.concat(songAudio)} />
			<ul>{paintedSongs}</ul>
		</>
	);
}