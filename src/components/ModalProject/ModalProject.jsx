import './ModalProject.css';
import { useState } from 'react';

const ModalProject = ({isOpen, onClose, addProject}) =>{

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('red');

    const colors = ['red', 'orange', 'blue', 'green', 'purple', 'yellow'];

    const handleColorPick = (color) =>{
        setColor(color);
    }

    if (!isOpen) return null;

    return (
        <div className="modalBg" onClick={onClose}>
            <div className="modalWrapper" onClick={(e) => e.stopPropagation()}>
                <button className="closeModalButton" onClick={onClose}>x</button>

                <form onSubmit={(e)=>{
                    
                   const newProject = {
                    id: localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')).length : 0,
                    title: title,
                    description: description,
                    color: color,
                    records: []
                  };

                    addProject(newProject);
                }}>
                    <div className="inputBox">
                        <label htmlFor="title">Project Title</label>
                        <input type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="description">Project Description</label>
                        <textarea name="description" id="description" cols="30" rows="7" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                    </div>

                    <div className="colorSelector">                       
                        {colors.map((color, index) => {
                            return <div key={index} onClick={()=>handleColorPick(color)} className={color === color ? 'active' : ''}></div>
                        }
                        )}
                    </div>

                    <button className='addProjectButton' type="submit">Add Project</button>
                </form>
            </div>
        </div>
    )
}

export { ModalProject }