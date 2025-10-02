import { useEffect } from "react";
import { Note } from "../components/Note"
import { useAxiosPrivate } from "../hooks/useAxiosPrivate"
import { useFetch } from "../hooks/useFetch";
import { ErrorBox } from "../components/ErrorBox";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { CreateNoteBtn } from "../components/CreateNoteBtn";
import { useSelector } from "react-redux";

export const HomePage = () => {

    const isChange = useSelector(state => state.auth.isChange);
    const axiosPrivate = useAxiosPrivate();

    const { loading, setLoading, data: notes, setData, error, setError } = useFetch();

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            try {

                const response = await axiosPrivate.get("/note", { withCredentials: true });
                // console.log("notes", response.data);
                setData(response.data.notes)

            } catch (err) {
                console.log("fetch notes error", err);
                setError(err?.response?.data?.message || err.message);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setError(null);
                }, 3000)
            }
        }
        fetchNotes();
    }, [axiosPrivate, isChange])

    return (
        <>
            {!loading && notes?.length == 0 && <div className="w-11/12 my-6 mx-auto py-3 px-2 text-center space-y-5">
                <h1 className="font-bold text-3xl">Create note easily.</h1>
                <CreateNoteBtn />
            </div>}

            {!loading && error && <div className="w-1/4 mx-auto my-4">
                <ErrorBox>{error}</ErrorBox>
            </div>}

            {loading && <LoadingSpinner />}

            {!loading && notes?.length > 0 && <div className="w-11/12 mt-6 h-[88vh] overflow-y-auto px-2 py-3 space-y-3 flex-col items-center mx-auto">
                {notes.map(note => <Note key={note._id} id={note._id} title={note.title} description={note.description} username={note?.userId?.username} userId={note.userId._id} />)}
            </div>}
        </>
    )
}
