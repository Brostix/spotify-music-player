import React, { useState, useEffect, Fragment } from "react";

function MusicPlayer() {
	const [myList, setMyList] = useState([]); //PASO 2: este useState va entre [] porque queremos que la lista de canciones (en este caso)
	// se guarde en un "Array" para poderlo recorrer mas adelante con el "map" (AQUI YA ESTA DECLARADO EL useState)
	// se hace todo esto porque necesitamos que "myList" se pueda modificar mas adelante (volver esa varible dinamica a traves del useState)
	const [listView, setListView] = useState("");
	const [musicAudio, setMusicAudio] = useState("");
	const SOUND_URL = "https://assets.breatheco.de/apis/sound/";
	const x = document.querySelector("musicplayer");

	// PASO 3: se usa useEffect en este caso porque necesitamos cargar la lista de canciones al cargar la pagina
	// y se realiza haciendo un arrow function "useEffect( () => englobando todo el Fetch )" que termina en la linea 28
	useEffect(() => {
		fetch(SOUND_URL.concat("songs"))
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				setMyList(responseAsJson); // PASO 1: se declara "setMyList" es el resultado del fetch que se coloca en la linea 4
				// junto a myList para hacerle el "useState" (ver linea 4)
				setListView(); //PASO 4: se declara listView porque es la funcion que mas adelante me va a mostar la lista de canciones
				// sigue en la linea 30
				console.log("lista de canciones", responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	// PASO 5: esta es la funcion del map que coge el responseAsJason (PASOS ANTERIORES)
	//para mostrarlo en lista (IMPORANTE se declara saveList porque es la variable que tiene esa lista de canciones
	//y/o recoge ese mapeo de canciones)
	useEffect(() => {
		setListView(
			myList.map((elemento, index) => {
				return (
					<ul
						id={index}
						key={index.toString()}
						onClick={() => {
							setMusicAudio(elemento.url);
							console.log(setMusicAudio(elemento.url));
							// console.log(setMusicAudio());
						}}>
						{elemento.name}
					</ul>
				);
			})
		);
	}, [myList]);

	function playAudio() {
		x.play();
		console.log(playAudio());
	}
	function pauseAudio() {
		x.pause();
		console.log(pauseAudio());
	}

	return (
		<Fragment>
			<div className>
				<button onClick={playAudio}>Play</button>
				<button onClick={pauseAudio}>Pause</button>
			</div>
			<div className="container">
				<div>
					{" "}
					<audio
						id="musicplayer"
						// ref="audio_tag"
						src={SOUND_URL.concat(musicAudio)}
						// controls
						// muted
						autoPlay
					/>{" "}
				</div>
				{listView}
			</div>
		</Fragment>
	);
}

export default MusicPlayer;
