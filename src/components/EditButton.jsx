

export const EditButton = ({ onEdit }) => {
    return (
        <button className="w-fit px-3 py-2 bg-blue-700 text-white rounded-md cursor-pointer transition-colors ease-in duration-200 hover:bg-blue-600" onClick={() => onEdit()}>Edit</button>
    )
}
