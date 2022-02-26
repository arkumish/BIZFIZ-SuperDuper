import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react'
import Loading from '../../component/Loading';
import  NavBar from '../../component/NavBar'
import FullReport from './FullReport';
import sample from './sample.json'

const ReportPage = ({match}) => {
    const [reportData, setReportData] = useState({});
    const [loading, setLoading] = useState(true);
    //const fetchData = async
    const loadData = useCallback(() => {
        const apiUrl = encodeURI(`https://bizfizbe.herokuapp.com/userinfo?userid=${match.params.reportId}`);
        console.log(apiUrl);
        axios.get(apiUrl)
            .then((res) => {
                console.log(res)
                setReportData(res.data)
                setLoading(false);
            }).catch((err)=>{
                window.alert("Kindly Refresh. Unable to fetch")
            })
    }, [match.params.reportId]);

    useEffect(() => {
        loadData()
    }, [loadData])
    return (
        <>
         <NavBar title={`Bank Admin : Form Details of ${match.params.reportId}`} showBackIcon={true}/>
         <div className="request-list">
         {(loading) ? (
                    <Loading />
                ) : (<>
                   
                   <h5 className="px-3 " style={{textAlign:'center', margin:'30px 10px'}}> 📃 Form ID : {match.params.reportId} </h5>
           

           <FullReport reportData={reportData} reportId={match.params.reportId}/>
                    </>
                )}
        
          </div>  
        </>
    )
}

export default ReportPage
