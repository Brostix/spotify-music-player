import React, { useState, useEffect, Fragment } from "react";

function MusicPlayer() {
	const SOUND_URL = "https://assets.breatheco.de/apis/sound/";
	const [songList, setSongList] = useState([]);
	const [myIndex, setMyIndex] = useState(-1);
	const [urlSong, setUrlSong] = useState(
		"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
	);

	const [playSong, setplaySong] = useState(false);
	const AUDIO = document.querySelector("#audio");

	useEffect(() => {
		fetch(SOUND_URL.concat("songs"))
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				setSongList(responseAsJson);
				console.log("lista de canciones", responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const songlist = songList.map((oneSong, index) => {
		return (
			<li
				className="onPlaying"
				key={oneSong.url}
				onClick={() => {
					setUrlSong(SOUND_URL.concat(oneSong.url));
					setMyIndex(index);
					setplaySong(true);
					AUDIO.load();
					AUDIO.play();
				}}>
				{oneSong.name}
			</li>
		);
	});

	function nextSong(songIndex) {
		let newurl = "";

		if (songList[songIndex + 1]) {
			newurl = SOUND_URL.concat(songList[songIndex + 1].url);
			setUrlSong(newurl);
			setMyIndex(songIndex + 1);
			AUDIO.load();
			AUDIO.play();
		} else {
			newurl = SOUND_URL.concat(songList[0].url);
			setUrlSong(newurl);
			setMyIndex(0);
			AUDIO.load();
			AUDIO.play();
		}
	}

	function previusSong(songIndex) {
		let newurl = "";

		if (songList[songIndex - 1]) {
			newurl = SOUND_URL.concat(songList[songIndex - 1].url);
			setUrlSong(newurl);
			setMyIndex(songIndex - 1);
			AUDIO.load();
			AUDIO.play();
		} else {
			newurl = SOUND_URL.concat(songList[songList.length - 1].url);
			setUrlSong(newurl);
			setMyIndex(songList.length - 1);
			AUDIO.load();
			AUDIO.play();
		}
	}

	return (
		<Fragment>
			<div className="img-title-box">
				<img
					className="img-box"
					src="https://logos-marcas.com/wp-content/uploads/2020/09/Spotify-Emblema.png"
					alt=""
				/>
				<h1 className="title-box">Welcome to my Geek Music player</h1>
			</div>

			<div className="title-tab">
				<p>Home</p>
			</div>
			<div className="song-list">{songlist}</div>

			<div className="button-box">
				<button
					className="button-size btn"
					onClick={() => previusSong(myIndex)}>
					<i className="fa fa-backward" />
				</button>
				<button
					className="button-size btn"
					onClick={() => AUDIO.pause()}>
					<i className="fa fa-pause" />
				</button>
				<button
					className="button-size btn"
					onClick={() => AUDIO.play()}>
					<i className="fa fa-play" />
				</button>
				<button
					className="button-size btn"
					onClick={() => nextSong(myIndex)}>
					<i className="fa fa-forward" />
				</button>
			</div>
			<audio id="audio">
				<source src={urlSong} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		</Fragment>
	);
}

export default MusicPlayer;
