import { FC, useEffect, useState } from 'react'
import Breadcrump from '../Breadcrump/Breadcrump';
import BtnDraftFlight from '../BtnDraftFlight/BtnDraftFlight';
import { useUser } from '../../hooks/useUser';

type Props = {
    desc: string,
    path: string,
    draftID: number | null | undefined
}
const ContainerUnderHeader: FC<Props> = ({desc, path, draftID}) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const { isAuthorized } = useUser();

    useEffect(() => {
        if (desc === 'auth' || desc === 'reg' || desc === 'profile') {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [desc])

    return (
        <div className='breadcrumb_and_draft_btn_container'>
            {!!isVisible &&
                (
                    <>
                        <Breadcrump desc={ desc } path= { path } />
                        {isAuthorized &&
                            (
                                <BtnDraftFlight draftID = { draftID }></BtnDraftFlight>
                            )
                        }
                    </>
                )
            }
        </div>
       
    )
}
    
    


export default ContainerUnderHeader;