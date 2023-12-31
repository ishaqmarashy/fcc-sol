import React, { useState , useEffect } from "react";

function Drums() {
    const keySound = {
        'Q': './mp3/Cev_H2.mp3',
        'W': './mp3/Dsc_Oh.mp3',
        'E': './mp3/Heater-1.mp3',
        'A': './mp3/Heater-2.mp3',
        'S': './mp3/Heater-3.mp3',
        'D': './mp3/Heater-4_1.mp3',
        'Z': './mp3/Heater-6.mp3',
        'X': './mp3/Kick_n_Hat.mp3',
        'C': './mp3/RP4_KICK_1.mp3',
    };
    const [pressedKey, setPressedKey] = useState('Click a Key');

    const handleInput = function (input) {
        var key =input;
        if(key.key){
            key= key.key.toUpperCase() 
        }
        if(!(key in keySound))
        {
            return;
        }
        const audioElement = document.getElementById(key);
        audioElement.currentTime = 0;
        audioElement.play()
            .catch(error => {
                console.error(`${key} audio file cannot be found at:${audioElement.src}`);
            });
        setPressedKey(key); 
    };

    useEffect(() => {
        window.addEventListener("keydown", handleInput);

        return () => {
            window.removeEventListener("keydown", handleInput);
        };
    });

    return (
        <header className="drum-machine-header">
            <div id='drum-machine'>
                <div id='display'>
                <p className="drum-display">

                    {pressedKey}
                    </p>
                    <div id='pad'>
                    {Object.keys(keySound).map(key => (
                        <div id={keySound[key]} className="drum-pad" key={key} onClick={() => handleInput(key)}>
                            <audio className="clip" src={keySound[key]} id={key}></audio>
                            {key}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Drums;
