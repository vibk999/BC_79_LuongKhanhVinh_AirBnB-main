import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function NoAuthGuard(props) {
    const userState = useSelector((state) => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/")
        }
    },[])
    return <>{props.children}</>
  
}
