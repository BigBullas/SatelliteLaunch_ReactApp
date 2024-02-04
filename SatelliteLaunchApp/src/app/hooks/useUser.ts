import { useDispatch, useSelector } from "react-redux"
import { setUserDataAction, cleanUserDataAction } from "../store/slices/userSlice"
import { RootState } from "../store/types"
import { api } from "../api"
import { UserType } from '../types'

type State = {
    userInfo: {
        Data: UserType,
	    isAuthorized: boolean,
    }
}

export const useUser = () => {
	const { Data, isAuthorized } = useSelector((state: RootState) => state.user );
	const { user_id, login, email, is_admin } = Data;
	const dispatch = useDispatch();

	const setUser = (value: State) => {
		dispatch(setUserDataAction(value.userInfo));
	}

	const resetUser = () => {
		dispatch(cleanUserDataAction());
	}

	const authorize = async () => {
		const response = await api.checkAuth.checkAuthList();

		if (response.status === 200) {
			const Data: UserType = {
				user_id: response.data["userId"],
				login: response.data["login"],
				is_admin: response.data["is_admin"],
			}
			const user: State = {
				userInfo: {
					Data,
					isAuthorized: true,
				}
			}

			setUser(user)

			return true;
		} else {
			return false;
		}
	}

	return {
		user_id,
		login,
		email,
		isAuthorized,
		is_admin,
		setUser,
		resetUser,
		authorize,
	}
}
