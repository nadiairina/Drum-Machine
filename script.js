
const drumPads = [
  { key: 'Q', sound: 'Heater 1', id: 'Q', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', sound: 'Heater 2', id: 'W', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', sound: 'Heater 3', id: 'E', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', sound: 'Heater 4', id: 'A', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', sound: 'Clap', id: 'S', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', sound: 'Open-HH', id: 'D', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', sound: 'Kick-n-Hat', id: 'Z', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', sound: 'Kick', id: 'X', clip: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', sound: 'Closed-HH', id: 'C', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

const DrumPad = ({ keyTrigger, sound, clip, updateDisplay }) => {
  const playSound = React.useCallback(() => {
    const audio = document.getElementById(keyTrigger);
    if (audio) {
      audio.currentTime = 0;
      audio.play()
        .then(() => {
          updateDisplay(sound);
          const pad = document.getElementById(sound);
          pad.classList.add('active');
          setTimeout(() => pad.classList.remove('active'), 100);
        })
        .catch(error => console.error("Error playing audio:", error));
    }
  }, [keyTrigger, sound, updateDisplay]);

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toUpperCase() === keyTrigger) {
        playSound();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [keyTrigger, playSound]);

  return (
    <div id={sound} className="drum-pad" onClick={playSound}>
      <audio id={keyTrigger} className="clip" src={clip}></audio>
      {keyTrigger}
    </div>
  );
};

const DrumMachine = () => {
  const [display, setDisplay] = React.useState("DRUM MACHINE");

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pads">
        {drumPads.map(pad => (
          <DrumPad 
            key={pad.key}
            keyTrigger={pad.key}
            sound={pad.sound}
            clip={pad.clip}
            updateDisplay={setDisplay}
          />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<DrumMachine />, document.getElementById('root'));
