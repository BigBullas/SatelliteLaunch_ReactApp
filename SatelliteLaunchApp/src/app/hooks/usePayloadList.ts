import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { setSpaceSatelliteData, setLoadCapacityStartData, 
    setLoadCapacityEndData, setFlightDateStartData, setFlightDateEndData } from '../store/slices/payloadsFilterSlice';

export function usePayloadList() {
	const loadCapacityStart = useSelector((state: RootState) => state.payloadFilter.Data.loadCapacityStart);
	const loadCapacityEnd = useSelector((state: RootState) => state.payloadFilter.Data.loadCapacityEnd);
	const flightDateStart = useSelector((state: RootState) => state.payloadFilter.Data.flightDateStart);
	const flightDateEnd = useSelector((state: RootState) => state.payloadFilter.Data.flightDateEnd);
	const spaceSatellite = useSelector((state: RootState) => state.payloadFilter.Data.spaceSatellite);

	const dispatch = useDispatch();

	const setLoadCapacityStart = (value: number) => {
		dispatch(setLoadCapacityStartData(value));
	}
	const setLoadCapacityEnd = (value: number) => {
		dispatch(setLoadCapacityEndData(value));
	}
	const setFlightDateStart = (value: string) => {
		dispatch(setFlightDateStartData(value));
	}
	const setFlightDateEnd = (value: number) => {
		dispatch(setFlightDateEndData(value));
	}
	const setSearchName = (value: string) => {
		dispatch(setSpaceSatelliteData(value));
	}

	return {
		loadCapacityStart,
		loadCapacityEnd,
		flightDateStart,
		flightDateEnd,
		spaceSatellite,
		setLoadCapacityStart,
		setLoadCapacityEnd,
		setFlightDateStart,
		setFlightDateEnd,
		setSearchName,
	}
}
