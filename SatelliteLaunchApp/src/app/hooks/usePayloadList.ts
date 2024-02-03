import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { setSpaceSatelliteData, setLoadCapacityStartData, 
    setLoadCapacityEndData, setFlightDateStartData, setFlightDateEndData } from '../store/slices/payloadsFilterSlice';

export function usePayloadList() {
	const loadCapStart: number | string = useSelector((state: RootState) => state.payloadFilter.Data.loadCapacityStart);
	const loadCapEnd: number | string = useSelector((state: RootState) => state.payloadFilter.Data.loadCapacityEnd);
	const flDateStart: Date | string = useSelector((state: RootState) => state.payloadFilter.Data.flightDateStart);
	const flDateEnd: Date | string = useSelector((state: RootState) => state.payloadFilter.Data.flightDateEnd);
	const spaceSatValue: string = useSelector((state: RootState) => state.payloadFilter.Data.spaceSatellite);

	const dispatch = useDispatch();

	const setLoadCapStart = (value: number | string) => {
		dispatch(setLoadCapacityStartData(value));
	}
	const setLoadCapEnd = (value: number | string) => {
		dispatch(setLoadCapacityEndData(value));
	}
	const setFlDateStart = (value: string | Date) => {
		dispatch(setFlightDateStartData(value));
	}
	const setFlDateEnd = (value: string | Date) => {
		dispatch(setFlightDateEndData(value));
	}
	const setSpaceSatValue = (value: string) => {
		dispatch(setSpaceSatelliteData(value));
	}

	return {
		loadCapStart,
		loadCapEnd,
		flDateStart,
		flDateEnd,
		spaceSatValue,
		setLoadCapStart,
		setLoadCapEnd,
		setFlDateStart,
		setFlDateEnd,
		setSpaceSatValue,
	}
}
