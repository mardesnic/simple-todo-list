import { useState, useEffect, useCallback } from 'react'
import Nav from './components/Nav'
import { Task } from './components/TaskItem'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {

  const defaultTasks: Task[] = []

  const [tasks, setTasks] = useState(defaultTasks)

  const fetchTasksFromStorage = useCallback(() => {
    const tasksFromStorage = localStorage.getItem('Tasks')
    let data = []
    try {
      data = tasksFromStorage !== null ? JSON.parse(tasksFromStorage) : []
    } catch (error) {
      console.log("error: ", error)
    }
    return data
  }, []);

  let data = fetchTasksFromStorage();

  const saveToStorage = (data: Task[]) => {
    localStorage.setItem('Tasks', JSON.stringify(data));
  }

  useEffect(() => {
    setTasks(fetchTasksFromStorage())
  }, [fetchTasksFromStorage])

  const addTask = (text: string, status: string) => {
    const lastTask = data.length ? data[data.length - 1] : null
    const newId = lastTask ? lastTask.id + 1 : 1
    let task = { id: newId, text, status }
    data.push(task)
    saveToStorage(data)
    setTasks([...tasks, task])
  }

  const deleteTask = (id: number) => {
    data = data.filter((task: Task) => task.id !== id)
    saveToStorage(data)
    setTasks(data)
  }

  const checkTask = (id: number) => {
    data = data.map((task: Task) => task.id === id ? { ...task, status: task.status === 'Done' ? '' : 'Done' } : task)
    saveToStorage(data)
    setTasks(data)
  }

  return (
    <>
      <Nav />
      <div className='well'>
        <h3>React - Simple To Do List App</h3>
        <hr />
        <AddTask onAdd={addTask} />
        <Tasks tasks={tasks} onDelete={deleteTask} onCheck={checkTask} />
      </div>
    </>
  );
}

export default App;