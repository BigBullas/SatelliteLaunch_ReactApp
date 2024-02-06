import { FC } from 'react'
import { Link } from 'react-router-dom';
import './Breadcrump.css'

type Props = {
    desc: string | string[],
    path: string | string[]
}
const Breadcrump: FC<Props> = ({desc, path}) => (
    <div className="breadcrump_container">
        <div className='divider'></div>

        <Link to="/" className="breadcrump__item breadcrump__part">Космические аппараты</Link>

        {typeof(desc) === 'string' ? (
                <>
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
                </>
            ) : (
                <>
                    {desc.map((item, id) => {
                        return (
                            <Link to={`/${path[id]}`} className="breadcrump__item" key={ id }>
                                <div className="breadcrump__part"> -&gt; </div>
                                <div className="breadcrump__part">{item}</div>
                            </Link>
                        );
                    })
                }
                </>
            )
        }


  </div>
)

export default Breadcrump;