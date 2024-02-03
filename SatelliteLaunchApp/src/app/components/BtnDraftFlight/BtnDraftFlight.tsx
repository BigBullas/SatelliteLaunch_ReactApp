import { FC } from 'react'
import './BtnDraftFlight.css'
import { Link } from 'react-router-dom';

type Props = {
    draftID: number | null | undefined
}


const BtnDraftFlight: FC<Props> = ({ draftID }) => (
   
    <div className="">
         {typeof(draftID) === 'number' && draftID ?
            (<Link to={`/profile/rocket_flights/${ draftID }`} className="btn-draft">Моя заявка</Link>)
            :
            (<Link to={`/profile/rocket_flights/${ draftID }`} className="btn-draft__disabled">Моя заявка</Link>)
        }
     </div>
)

export default BtnDraftFlight;