import { useState } from 'react'
import '../css/AddTask.css'

type Props = {
    onAdd: (text:string, status:string) => void
}

const AddTask = ({onAdd}: Props) => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('')
    const onSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault()
        onAdd(text, status)
        setText('')
        setStatus('')
    }
    return (
        <form onSubmit={onSubmit}>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)} required />
            <input type='submit' value='Add Task' className='btn btn-primary' />   
        </form>
    )
}

export default AddTask
