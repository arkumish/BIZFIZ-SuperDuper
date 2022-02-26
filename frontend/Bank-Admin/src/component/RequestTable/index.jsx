import React from 'react'
import { Link } from 'react-router-dom';

const RequestTable = ({userData}) => {
    const statusSwitch = (status) => {
        switch (status) {
            case 1:
                return  <span class="badge bg-soft-success text-success">Accepted</span>
            case 2:
                return <span class="badge bg-soft-danger text-danger">Rejected</span>
            case 0:
                return <span class="badge bg-soft-warning text-warning">To Review</span>
            default:
                return 'Pending';
        }
    }
    return (
        <>
            <div class="table-responsive">
                <table class="table table-hover table-nowrap">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {userData.map((item, index) => {
                return (
                    <Link key={index} to={`/report/${item.userId}`} >
                       <tr>
                            <td data-label="Job Title">
                                <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar-sm rounded-circle me-2" />
                                    <a class="text-heading font-semibold" href="#">
                                       {item.name}
                    </a>
                </td>
                                <td >
                                    <span>{item.mobile}</span>
                                </td>
                               
                               <td>
                                   <span>{item.applicationDate}</span>
                               </td>
                                <td >
                                    {statusSwitch(item.applicationStatus)}
                                </td>
                               
                               
            </tr>
                    </Link>
                )
            })}
                       
                                   
        </tbody>
    </table>
</div> 
        </>
    )
}

export default RequestTable
