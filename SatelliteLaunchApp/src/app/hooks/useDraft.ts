import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { setDraftDataAction, cleanDraftDataAction, setDraftIdDataAction } from '../store/slices/draftSlice';
import { RocketFlightType } from '../types'

type State = {
  draftInfo: {
    Data: RocketFlightType
  }
}

export function useDraft() {
	const {flight_id, creator_id, creator_login, moderator_id,
			moderator_login, status, created_at, formed_at, confirmed_at, 
			flight_date, load_capacity, price, title, place_number} = useSelector((state: RootState) => state.draft.Data);
	const dispatch = useDispatch();

	const setDraft = (value: State) => {
		dispatch(setDraftDataAction(value.draftInfo.Data));
	}

	const resetDraft = () => {
		dispatch(cleanDraftDataAction());
	}

	const setDraftId = (draft_id: number) => {
		dispatch(setDraftIdDataAction(draft_id));
	}

	const hasDraft = () => useSelector((state: State) => state.draftInfo.Data?.flight_id !== -1 || !state.draftInfo.Data)

	return {
		flight_id, creator_id, creator_login, moderator_id,
		moderator_login, status, created_at, formed_at, confirmed_at, 
		flight_date, load_capacity, price, title, place_number,
		setDraft,
		hasDraft,
		resetDraft,
		setDraftId
	}
}
