import React, {useState, useEffect, useContext, useCallback} from "react";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext';
import { Loader } from "../Components/Loader";
import { LinksList } from '../Components/LinksList';

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (error) {
      
    }
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }

  return (
   <>
   {!loading && <LinksList links={links} />}
   </>
  );
};
