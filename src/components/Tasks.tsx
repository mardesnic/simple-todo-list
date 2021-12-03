import TaskItem, { Task } from './TaskItem'
import '../css/Tasks.css'

type Props = {
    tasks: Task[],
    onDelete: (id: number) => void,
    onCheck: (id: number) => void
}

const Tasks = ({ tasks, onDelete, onCheck }: Props) => {
    return (
        <div className='tasks-wrappper'>
            <div className='grid heading'>
                <div>#</div>
                <div>Task</div>
                <div>Status</div>
                <div className='action'>Action</div>
            </div>
            <div className='grid'>
                {tasks.map((task: Task) => (
                    <TaskItem key={task.id} task={task} onDelete={onDelete} onCheck={onCheck} />
                ))}
            </div>
        </div>
    )
}

export default Tasks