import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { setEndDataAction, setSearchTitleDataAction, setStartDataAction, setStatusDataAction } from '../store/slices/flightsFilterSlice';

export function useFlightList() {
	const startDate = useSelector((state: RootState) => state.flightFilter.Data.startDate);
	const endDate = useSelector((state: RootState) => state.flightFilter.Data.endDate);
	const status = useSelector((state: RootState) => state.flightFilter.Data.status);
	const title = useSelector((state: RootState) => state.flightFilter.Data.title);

	const dispatch = useDispatch();

	const setStartDate = (value: string) => {
		dispatch(setStartDataAction(value));
	}
	const setEndDate = (value: string) => {
		dispatch(setEndDataAction(value));
	}
	const setStatus = (value: string) => {
		dispatch(setStatusDataAction(value));
	}
	const setTitle = (value: string) => {
		dispatch(setSearchTitleDataAction(value));
	}

	return {
		minDate: startDate,
		maxDate: endDate,
		status,
		title,
		setTitleDataAction: setTitle, 
		setEndDateAction: setEndDate,
		setStatusDataAction: setStatus,
		setStartDateAction: setStartDate,
	}
}
