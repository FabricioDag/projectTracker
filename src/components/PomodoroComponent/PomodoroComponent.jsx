import './PomodoroComponent.css'

import { useState,useEffect } from "react";

const PomodoroComponent = ({addRecord, target}) =>{

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

    const [currentSession, setCurrentSession] = useState(0);

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
      setCurrentSession(currentSession + workTime/60); // adiciona worktime ao session
    } else {
      setCurrentTimer('longBreak');
      setTime(longBreakTime);
      setCycleCount(-1); //gambiarra pra depois do longbreak o counter estar em 0
      setCurrentSession(currentSession + workTime/60); // adiciona worktime ao session
    }
  };

  // Controla o efeito do tempo
  useEffect(() => {
    let interval;
    if (isTimerRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1);

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

  const getTotalTime = () => {
    if (currentTimer === 'work') {
      return workTime;
    } else if (currentTimer === 'shortBreak') {
      return shortBreakTime;
    } else {
      return longBreakTime;
    }
  };

  const totalTime = getTotalTime();

  const handleEndSession = () => {
    const newRecord = {
      date: new Date().toISOString(),
      minutes: currentSession,
    };

    addRecord(target, newRecord)
    setCurrentSession(0)
  }

    return(
        <div className='timerWrapper' onClick={handleClick}>
        <p className="currentSession">CurrentSession: {currentSession}</p>
        <div className='timer'>
            <h1 className='timerValue'>{formatTime(time)}</h1>
            <p className='timerAction'>
              {isTimerRunning ? 'PAUSE' : 'PLAY'}
            </p>
          </div>

          <div className="progressBarTimer"
          style={{ width: ((totalTime - time) / totalTime) * 100 + '%' }}
          ></div>
          <button className="endSession" onClick={handleEndSession}>End Session</button>
        </div>
    )
}

export {PomodoroComponent}