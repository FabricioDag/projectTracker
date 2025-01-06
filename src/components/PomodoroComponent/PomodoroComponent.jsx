import './PomodoroComponent.css'

import { useState,useEffect } from "react";

const PomodoroComponent = () =>{

    const [workTime, setWorkTime] = useState(
        () => Number(localStorage.getItem('workTime')) || 1500
      );
    const [shortBreakTime, setShortBreakTime] = useState(
        () => Number(localStorage.getItem('shortBreakTime')) || 300
      );
    const [longBreakTime, setLongBreakTime] = useState(
        () => Number(localStorage.getItem('longBreakTime')) || 900
      );
    const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(
        () => Number(localStorage.getItem('cyclesBeforeLongBreak')) || 4
      );

    const [time, setTime] = useState(workTime);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);

    const [currentTimer, setCurrentTimer] = useState('work');

    // Salvando as configurações no localStorage
    useEffect(() => {
        localStorage.setItem('workTime', workTime);
        localStorage.setItem('shortBreakTime', shortBreakTime);
        localStorage.setItem('longBreakTime', longBreakTime);
        localStorage.setItem('cyclesBeforeLongBreak', cyclesBeforeLongBreak);
    }, [workTime, shortBreakTime, longBreakTime, cyclesBeforeLongBreak]);

    // Formatação do tempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    //return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
    }`;
  };

  useEffect(() => {
    resetTimer(); // Reseta o timer sempre que qualquer um desses valores for alterado
  }, [workTime, shortBreakTime, longBreakTime, currentTimer]);

  // Reseta o timer
  const resetTimer = () => {
    setIsTimerRunning(false);
    //gerenciar qual o timer que estava antes do reset
    currentTimer == 'work'
      ? setTime(workTime)
      : currentTimer == 'shortBreak'
      ? setTime(shortBreakTime)
      : setTime(longBreakTime);
  };

  const nextTimer = () => {
    setIsTimerRunning(false);
    //gerenciar qual o proximo timer
    if (currentTimer !== 'work') {
      setCurrentTimer('work');
      setTime(workTime);

      setCycleCount((prev) => prev + 1); //counter ciclos ++
    } else if (currentTimer == 'work' && cycleCount < cyclesBeforeLongBreak) {
      setCurrentTimer('shortBreak');
      setTime(shortBreakTime);
    } else {
      setCurrentTimer('longBreak');
      setTime(longBreakTime);
      setCycleCount(-1); //gambiarra pra depois do longbreak o counter estar em 0
    }
  };

  // Controla o efeito do tempo
  useEffect(() => {
    let interval;
    if (isTimerRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      // ciclo termina dps de um intervalo
    } else if (time === 0) {
      nextTimer();
      //resetTimer()
    }
    return () => clearInterval(interval);
  }, [
    isTimerRunning,
    time,
    currentTimer,
    cycleCount,
    cyclesBeforeLongBreak,
    workTime,
    shortBreakTime,
    longBreakTime,
  ]);

  const handleClick = () => {
    setIsTimerRunning(!isTimerRunning);
  };

    return(
        <div className='timerWrapper' onClick={handleClick}>
        <div className='timer'>
            <h1 className='timerValue'>{formatTime(time)}</h1>
            <p className='timerAction'>
              {isTimerRunning ? 'PAUSE' : 'PLAY'}
            </p>
          </div>
        </div>
    )
}

export {PomodoroComponent}