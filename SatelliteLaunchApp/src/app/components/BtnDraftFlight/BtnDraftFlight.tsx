import { FC } from 'react'
import './BtnDraftFlight.css'
import { Link } from 'react-router-dom';

type Props = {
    draftID: number | null | undefined
}


const BtnDraftFlight: FC<Props> = ({ draftID }) => (
   
    <div className="">
         {typeof(draftID) === 'number' && draftID ?
            (<Link to={`/rocket_flights/${ draftID }`} className="btn-draft">Мой полёт</Link>)
            :
            (<Link to={`/rocket_flights/${ draftID }`} className="btn-draft__disabled" onClick={(event) => event.preventDefault()}>Мой полёт</Link>)
        }
     </div>
)

export default BtnDraftFlight;

// TODO: убрать кнопку, если админ находится на страницах Модерации полезных нагрузок или на странице Планируемые полёты