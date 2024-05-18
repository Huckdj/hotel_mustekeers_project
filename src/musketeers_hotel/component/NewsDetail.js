import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function NewsDetail() {
    const { id } = useParams()
    console.log(useParams())
    const [newInfo, setNewinfo] = useState();
    useEffect(() => {
            axios.get(`http://localhost:4000/newsdetail/${id}`)
            .then (res => setNewinfo(res.data)
            )
      },[id]);
  return (
    <div>
        {newInfo && newInfo.map((news) => (
            <div>
                <h2>{news.tuade}</h2>
                {news.noidung}
            </div>
        ))}
    </div>
  )
}

export default NewsDetail
