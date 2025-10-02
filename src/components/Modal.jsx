import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../store/modalSlice";
import { useFetch } from "../hooks/useFetch";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { ErrorBox } from "./ErrorBox";
import { redirect } from "react-router-dom";
import { authAction } from "../store/authSlice";


export const Modal = () => {

    const dialogRef = useRef();
    const open = useSelector(state => state.modal.open);
    const { loading, setLoading, error, setError } = useFetch();
    const axiosPrivate = useAxiosPrivate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [open])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        // console.log(data);

        try {
            const response = await axiosPrivate.post("/note", data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            // console.log("created note",response.data);
            dispatch(modalAction.closeModal());
            dispatch(authAction.change());
            redirect("/");
            
        } catch (err) {
            console.log("create note error", err);
            setError(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }

    }


    return (
        <dialog ref={dialogRef} className="w-[90%] max-w-md m-auto rounded-lg p-6 bg-white text-slate-900 [&::-webkit-backdrop]:bg-black/60 [&::backdrop]:bg-black/60 border-none" onClose={() => dispatch(modalAction.closeModal())}>
            <div className="text-right w-full mb-3">
                <button onClick={() => dispatch(modalAction.closeModal())} className="p-2 rounded hover:bg-slate-100 cursor-pointer"> ✕</button>
                {!loading && error && <ErrorBox>{error}</ErrorBox>}
            </div>
            <form className='w-full p-3   bg-transparent border-none  rounded-md' onSubmit={handleSubmit}>
                <div className='flex-col mb-4'>
                    <label className='text-lg font-medium px-2'>Title</label>
                    <input className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='text' name='title' placeholder='Enter Title' />
                </div>
                <div className='flex-col mb-4'>
                    <label className='text-lg font-medium px-2'>Description</label>
                    <textarea className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='text' name='description' rows={4} placeholder='Enter Description' />
                </div>
                <div className='text-right space-x-2'>
                    <button type='button' className='px-2 py-1 text-white rounded-md cursor-pointer transition-colors duration-200 ease-out bg-gray-400 hover:bg-gray-500' disabled={loading ? true : false} onClick={() => dispatch(modalAction.closeModal())}>Cancel</button>
                    <button type='submit' className='px-2 py-1 text-white rounded-md cursor-pointer transition-colors duration-200 ease-out bg-blue-700 hover:bg-blue-600' disabled={loading ? true : false}>{loading ? "Submitting" : "Create"}</button>
                </div>
            </form>
        </dialog>
    )
}
