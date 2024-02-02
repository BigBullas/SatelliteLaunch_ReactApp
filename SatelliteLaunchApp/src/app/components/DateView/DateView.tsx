import { FC } from 'react'
import { dateConversion } from '../../utils'

type Props = {
    dateStart?: Date,
    dateEnd?: Date,
    isShort: boolean
}

const DateView: FC<Props> = ({dateStart = new Date(), dateEnd = new Date(), isShort = false}) => {
    if (dateConversion(dateStart, false) === dateConversion(dateEnd, false)) {
        return (<span>{ dateConversion(dateStart, !isShort) }</span>);
    }
    return (
        <>
            <span>{ dateConversion(dateStart, !isShort) }</span> - <span>{ dateConversion(dateEnd, !isShort) }</span>
        </>
    )
}

export default DateView;