import { useState, useEffect, useCallback } from 'react'
import Nav from './components/Nav'
import { Task, DONE } from './components/TaskItem'
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

  const saveToStorage = (data: Task[]) => {
    localStorage.setItem('Tasks', JSON.stringify(data));
  }

  useEffect(() => {
    setTasks(fetchTasksFromStorage())
  }, [fetchTasksFromStorage])

  const addTask = (text: string, status: string) => {
    const lastTask = tasks.length ? tasks[tasks.length - 1] : null
    const newId = lastTask ? lastTask.id + 1 : 1
    let task = { id: newId, text, status }
    const newTasks = [...tasks, task]
    saveToStorage(newTasks)
    setTasks(newTasks)
  }

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task: Task) => task.id !== id)
    setTasks(newTasks)
    saveToStorage(newTasks)
  }

  const checkTask = (id: number) => {
    const newTasks = tasks.map((task: Task) => task.id === id ? { ...task, status: task.status === DONE ? '' : DONE } : task)
    saveToStorage(newTasks)
    setTasks(newTasks)
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