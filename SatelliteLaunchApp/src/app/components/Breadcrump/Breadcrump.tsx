import { FC } from 'react'
import { Link } from 'react-router-dom';
import './Breadcrump.css'

type Props = {
    desc: string,
    path: string
}
const Breadcrump: FC<Props> = ({desc, path}) => (
    <div className="breadcrump_container">
        <div className='divider'></div>

        <Link to="/" className="breadcrump__item breadcrump__part">Космические аппараты</Link>

        {desc ?
        <Link to={`/${path}`} className="breadcrump__item">
            <div className="breadcrump__part"> -&gt; </div>
            <div className="breadcrump__part">{desc}</div>
        </Link>
        : path &&
        <Link to={`/${path}`} className="breadcrump__item">
            <div className="breadcrump__part"> -&gt; </div>
            <div className="breadcrump__part">{path}</div>
        </Link>
        }
  </div>
)

export default Breadcrump;