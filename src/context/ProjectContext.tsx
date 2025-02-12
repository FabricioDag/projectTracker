import { createContext, useContext, useState, useEffect } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem("projects")) || []
  );

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  // Função para adicionar um novo registro de horas ao projeto
  const addRecord = (projectId, record) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, records: [...project.records, record] }
          : project
      )
    );
  };

  const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
  };

  const toggleTodoCompletion = (projectId, todoId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              todos: project.todos.map((todo) =>
                todo.id === todoId
                  ? { ...todo, completed: !todo.completed }
                  : todo
              ),
            }
          : project
      )
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        addRecord,
        getProjectById,
        toggleTodoCompletion,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  return useContext(ProjectContext);
};
