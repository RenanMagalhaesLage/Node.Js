import { Navigate } from "react-router-dom"
import { useParams } from "react-router-dom"

type RoomParams = {
    id: string
}

export function Room() {
    const params = useParams<RoomParams>()

    if(!params.id){
        return <Navigate replace to="/"/>
    }
  return (
    <div>Room Details</div>
  )
}
