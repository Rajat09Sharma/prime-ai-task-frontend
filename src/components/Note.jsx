import { useNavigate } from "react-router-dom"
import { EditButton } from "./EditButton"
import { useSelector } from "react-redux";



export const Note = ({ id, title, description, username, userId }) => {

    const loginUserId = useSelector(state => state.auth.userId);    
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/note/${id}`);
    }


    return (
        <div className="note w-full py-4 px-3 bg-slate-800 text-white border border-gray-600 rounded-md shadow-lg shadow-gray-600">
            <div className="mb-8 space-y-2.5">
                <h3 className="font-bold text-2xl">{title}</h3>
                <p className="text-lg">{description}</p>
                <p className="text-slate-400 text-sm italic">by: {username}</p>
            </div>
            {userId == loginUserId && <div className="text-right space-x-3">
                <EditButton onEdit={handleEdit} />
            </div>}
        </div>
    )
}
