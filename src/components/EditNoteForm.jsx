
import { useFetch } from "../hooks/useFetch";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { ErrorBox } from "./ErrorBox";
import { useNavigate } from "react-router-dom";


export const EditNoteForm = ({ id, title, description }) => {

    const { loading, setLoading, error, setError } = useFetch();
    const { loading: deleteLoading, setLoading: setDeleteLoading, error: deleteError, setError: setDeleteError } = useFetch();

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        // setDeleteLoading(false);
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        // console.log(data);

        try {

            const response = await axiosPrivate.patch(`/note/${id}`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            // console.log("note update response", response.data);
            navigate("/");

        } catch (err) {
            console.log("note updating error", err);
            setError(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
            setDeleteLoading(false);
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (!confirmDelete) return;

        setDeleteError(true);
        // setLoading(true);
        try {
            const response = await axiosPrivate.delete(`/note/${id}`, { withCredentials: true });
            // console.log("delete note response", response.data.message);
            navigate("/");
        } catch (err) {
            console.log("delete note error", err.message);
            setDeleteError(err?.response?.data?.message || err.message);
        } finally {
            setDeleteLoading(false);
            setLoading(false);
        }

    }


    return (
        <>
            <form className='w-full px-3 py-4  bg-transparent border border-slate-300 shadow-lg shadow-slate-800 rounded-md' onSubmit={handleSubmit}>
                {!loading && error && <ErrorBox>{error}</ErrorBox>}
                {!deleteLoading && deleteError && <ErrorBox>{deleteError}</ErrorBox>}
                <div className='flex-col mb-4'>
                    <label className='text-lg font-medium px-2'>Title</label>
                    <input className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='text' name='title' defaultValue={title} placeholder='Enter Title' />
                </div>
                <div className='flex-col mb-4'>
                    <label className='text-lg font-medium px-2'>Description</label>
                    <textarea className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='text' name='description' defaultValue={description} rows={4} placeholder='Enter Description' />
                </div>
                <div className='text-right space-x-2'>
                    <button type='button' className='px-2 py-1 text-white rounded-md cursor-pointer transition-colors duration-200 ease-out bg-gray-400 hover:bg-gray-500' disabled={loading ? true : false} onClick={() => navigate("/")}>Cancel</button>
                    <button type='submit' className='px-2 py-1 text-white rounded-md cursor-pointer transition-colors duration-200 ease-out bg-blue-700 hover:bg-blue-600' disabled={loading ? true : false}>{loading ? "Submitting...." : "Submit"}</button>
                    <button type='button' className='px-2 py-1 text-white rounded-md cursor-pointer transition-colors duration-200 ease-out bg-red-700 hover:bg-red-600' disabled={deleteLoading ? true : false} onClick={handleDelete}>{deleteLoading ? "Deleting...." : "Delete"}</button>
                </div>
            </form>
        </>
    )
}
