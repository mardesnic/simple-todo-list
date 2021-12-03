import '../css/Nav.css'

type Props = {
    title: string
}

const Nav = ({title}: Props) => {
    return <nav><a href='/'>{title}</a></nav>
}

Nav.defaultProps = {
    title: 'Sourcecodester'
}

export default Nav
