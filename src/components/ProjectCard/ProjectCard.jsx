import './ProjectCard.css';

const ProjectCard = ({project, timeFrame,addRecord,deleteProject, lastPeriod, actualPeriod}) => {

  // const calcularTempoPorPeriodo = (records, periodoFornecido) => {  
  //   return records.reduce((total, record) => {
  //     const data = new Date(record.date);
  //     if (data >= periodoFornecido.inicio && data <= periodoFornecido.fim) {
  //       return total + record.minutes;
  //     }
  //     return total;
  //   }, 0);
  // };
    
    // const lastWorkedHours = calcularTempoPorPeriodo(project.records, lastPeriod);
    // const actualWorkedHours = calcularTempoPorPeriodo(project.records, actualPeriod);

    const handleClick = () => {
      const newRecord = {
        date: new Date().toISOString(),
        minutes: Math.floor(Math.random() * 60),
      };

      addRecord(project.id, newRecord)
    }

    return (
        <div className={`projectCard ${project.color}`}>
            <div className="projectCardHeader">
              <h2 className='projectCardTitle'>
                {project.title}
              </h2>

              <button onClick={()=>deleteProject(project.id)}>...</button>
            </div>

            <div className="projectCardBody">
              <p>{project.description}</p>
              <p className='workedHours'>
                teste min
              </p>
              <p className='lastWorkedHours'>
                {timeFrame === 'daily' ? 'Yesterday ' : timeFrame === 'weekly' ? 'Last Week ' : 'Last Month '}
                teste min
              </p>

              <div className="records">
                <p>Records:</p>
                {project.records.map((record, index) => {
                  return (
                    <div key={index} className='record'>
                      <p>{record.date}</p>
                      <p>{record.minutes} min</p>
                    </div>
                  )
                })}
                </div>

            </div>

            <button onClick={()=>handleClick()}>add random record</button>
          </div>
    );
    }

    export { ProjectCard };