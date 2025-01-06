import { useState } from 'react'
import { ModalProject, ProjectCard } from './components'
import './App.css'


function App() {

  const [timeFrame, setTimeFrame] = useState('daily')
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);

  const [lastPeriod, setLastPeriod] = useState({inicio:'', fim:''})
  const [actualPeriod, setActualPeriod] = useState({inicio:'', fim:''})

  const [dataProjects, setDataProjects] = useState(() => {
    const storedProjects = localStorage.getItem('projects');
    return storedProjects ? JSON.parse(storedProjects) : [];
  });

  const calcularPeriodoAnterior = (opcao) => { // calcula o ultimo periodo (ontem, semana passada, mes passado)
    // fazer cache dos periodos
    const hoje = new Date('2025-1-5');
    alert(hoje)
    
    switch (opcao) {
      case 'daily':
        const ontem = new Date(hoje);
        ontem.setDate(hoje.getDate() - 1);
        return { inicio: ontem, fim: ontem };
  
      case 'weekly':
        const inicioSemana = new Date(hoje);
        const fimSemana = new Date(hoje);
        const diaAtual = hoje.getDay(); // 0 = domingo, 6 = sábado
        inicioSemana.setDate(hoje.getDate() - diaAtual - 6);
        fimSemana.setDate(hoje.getDate() - diaAtual);
        return { inicio: inicioSemana, fim: fimSemana };
  
      case 'monthly':
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
        const fimMes = new Date(hoje.getFullYear(), hoje.getMonth(), 0); // Último dia do mês anterior
        return { inicio: inicioMes, fim: fimMes };
  
      default:
        throw new Error('Opção inválida');
    }
  };

  const calcularPeriodoAtual = (opcao) => { // calcula o periodo atual (hoje, semana atual, mes atual)
    // fazer cache dos periodos
    const hoje = new Date('2025-1-5');
    switch (opcao) {
      case 'daily':
        return { inicio: hoje, fim: hoje };
  
      case 'weekly':
        const diaAtual = hoje.getDay(); // 0 = domingo, 6 = sábado
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - diaAtual);
        return { inicio: inicioSemana, fim: hoje };
  
      case 'monthly':
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        return { inicio: inicioMes, fim: hoje };
  
      default:
        throw new Error('Opção inválida');
    }
  }

  const handleChangeTimeframe = (value) =>{
    setTimeFrame(value)
    setLastPeriod(calcularPeriodoAnterior(value))
    setActualPeriod(calcularPeriodoAtual(value))
  }

  const addProject = (project) => {
    const updatedProjects = [...dataProjects, project];
    setDataProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }

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
                 lastPeriod={lastPeriod} 
                 actualPeriod={actualPeriod} 
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
