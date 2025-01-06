import { useState } from 'react'
import { ModalProject, ProjectCard, PomodoroComponent } from './components'
import './App.css'


function App() {

  const [timeFrame, setTimeFrame] = useState('daily')
  const timeFrames = ['daily', 'weekly', 'monthly'] // fazer loop nas opções

  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);

  const [dataProjects, setDataProjects] = useState(() => {
    const storedProjects = localStorage.getItem('projects');
    return storedProjects ? JSON.parse(storedProjects) : [];
  });


  const addProject = (project) => {
    const updatedProjects = [...dataProjects, project];
    setDataProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }

  const deleteProject = (projectId) => {
    const updatedProjects = dataProjects.filter((project) => project.id !== projectId);
    setDataProjects(updatedProjects);
    console.log(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const addRecord = (projectId, record) => {
    alert('chegou em addRecord')
    const updatedProjects = dataProjects.map(project => {
      if (project.id === projectId) {
        project.records.push(record);
      }
      return project;
    });
    setDataProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }

  return (
    <div className="App">
      
      <div className="wrapperProjects">

          {dataProjects.length > 0?
            dataProjects.map((project, index) => {
              return(
                 <ProjectCard 
                 key={index} 
                 project={project}
                 deleteProject={deleteProject} 
                //  lastPeriod={lastPeriod} 
                //  actualPeriod={actualPeriod} 
                 timeFrame={timeFrame} 
                 addRecord={addRecord}
                 />
              )
                })
            : <h1>No projects</h1>
          }

          <div className="addProjectCard">
            <button onClick={()=>setIsModalProjectOpen(true)}>Add a Project</button>
          </div>
          
      </div>

      <div className="timeframesSelector">
        <button onClick={()=>handleChangeTimeframe('daily')} className={timeFrame === 'daily'? 'active': ''}>Daily</button>
        <button onClick={()=>handleChangeTimeframe('weekly')} className={timeFrame === 'weekly'? 'active': ''}>Weekly</button>
        <button onClick={()=>handleChangeTimeframe('monthly')} className={timeFrame === 'monthly'? 'active': ''}>Monthly</button>
      </div>

      <PomodoroComponent></PomodoroComponent>

      {isModalProjectOpen &&
        <ModalProject 
        addProject={addProject} 
        isOpen={isModalProjectOpen} 
        onClose={()=>setIsModalProjectOpen(false)}/>
      }
    </div>
  )
}

export default App
