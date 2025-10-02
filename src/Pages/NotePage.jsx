import { EditNoteForm } from "../components/EditNoteForm"
import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { ErrorBox } from "../components/ErrorBox";
import { useParams } from "react-router-dom";

export const NotePage = () => {

  const { id } = useParams();

  const { loading, setLoading, error, setError, data: note, setData } = useFetch({});

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(`/note/${id}`, { withCredentials: true });
        // console.log("fetch note by id response", response.data);
        setData(response.data.note);

      } catch (err) {
        console.log("fetch note by id error", err);
        setError(err?.response?.data?.message || err.message)

      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [axiosPrivate,setData,setError,setLoading,id])

  return (
    <>
      {!loading && error && <div className="w-9/12 mx-auto my-4">
        <ErrorBox>{error}</ErrorBox>
      </div>
      }
      {loading && <p>Loading note............</p>}
      {!loading && <div className="w-9/12 bg-slate-300 rounded-md mx-auto my-6">
        <EditNoteForm id={note?._id} title={note?.title} description={note?.description} />
      </div>}
    </>
  )
}
