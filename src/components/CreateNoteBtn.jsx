import { useDispatch } from "react-redux"
import { modalAction } from "../store/modalSlice";


export const CreateNoteBtn = () => {

    const dispatch = useDispatch();

    return (
        <button className="w-fit px-3 py-2 bg-amber-700 text-white rounded-md cursor-pointer transition-colors ease-in duration-200 hover:bg-amber-600" onClick={() => dispatch(modalAction.openModal())}>Create Note</button>
    )
}
