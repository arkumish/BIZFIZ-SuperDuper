import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react'
import NavBar from '../../component/NavBar'
import RequestList from './RequestList'
import userData from './sampleData'
import './index.css'
import Loading from '../../component/Loading';
import RequestTable from '../../component/RequestTable';

const AllRequestPage = () => {



    const [allData, setAllData] = useState({});
    const [allDataSecond, setAllDataSecond] = useState({});
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(() => {
        const apiUrl = `https://bizfizbe.herokuapp.com/all`;
        axios.get(apiUrl)
            .then((res) => {
                console.log(res.data)
                    let first = res.data.filter((item)=>{
                        return item.applicationStatus == 0 || item.applicationStatus == 3
                    })
                    let second = res.data.filter((item)=>{
                        return item.applicationStatus == 1 || item.applicationStatus == 2
                    })

                    console.log(first, second)
                    setAllData(first)
                    setAllDataSecond(second)
                setLoading(false);
            }).catch((err)=>{
                window.alert("Kindly Refresh. Unable to fetch")
            })
    }, []);

    useEffect(() => {
        loadData()
    }, [loadData])
    return (
        <>
            <NavBar title={"Bank Admin : All Forms"} showBackIcon={false} />
           <br/>
           <div className="request-list">
           <h5 className="px-3 " style={{textAlign:'center'}}> 📃 All Requested Application </h5>
            <div className="requesPage mx-4 my-3">
                {(loading) ? (
                    <Loading />
                ) : (<>
                   
                    <RequestList title={"To Review "} userData={allData} />
                    <RequestList title={"Reviwed"} userData={allDataSecond} />
                    </>
                )}

            </div>
            </div>

        </>
    )
}

export default AllRequestPage
