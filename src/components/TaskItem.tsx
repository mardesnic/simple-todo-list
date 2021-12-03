import { FaTimes, FaRegCheckSquare } from 'react-icons/fa'

export type Task = {
    id: number,
    text: string,
    status: string
}

export const DONE = 'Done'

type Props = {
    task: Task,
    onDelete: (id: number) => void,
    onCheck: (id: number) => void
}

const TaskItem = ({ task, onDelete, onCheck }: Props) => {
    return (
        <>
            <div>{task.id}</div>
            <div>{task.text}</div>
            <div>{task.status}</div>
            <div className='action'>
                {task.status !== DONE && (
                    <>
                        <button className='btn btn-success' onClick={() => onCheck(task.id)}><FaRegCheckSquare /></button>
                        <span className='button-divider'>|</span>
                    </>
                )}
                <button className='btn btn-danger' onClick={() => onDelete(task.id)}><FaTimes /></button>
            </div>
            <div className='line'></div>
        </>
    )
}

export default TaskItem