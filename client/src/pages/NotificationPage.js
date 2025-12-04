import React from 'react'
import Layout from '../components/Layout'
import { message, Tabs } from 'antd'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {showLoading,hideLoading,} from '../redux/features/alertSlice'
import axios  from 'axios';
import{useNavigate} from 'react-router-dom'
import { setUser } from '../redux/features/userSlice';


const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    //handle read notification
    const handlerMarkAllRead = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification',{userId: user._id,},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                }
            });
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
                 dispatch(setUser(res.data.data));
            }else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error("somthing went wrong")
        }
    };
    // deleted notification
    const handlerDeleteAllRead = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong in notification');
            
        }
    };
  return (
    <Layout>
        <h4 className='p-3 text-center'>Notification Page</h4>
        <Tabs>
            <Tabs.TabPane tab='UnRead' key={0}>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2' onClick={handlerMarkAllRead}>Mark All Read</h4>
                </div>
                {
                    user?.notification.map(notificationMgs => (
                        <div className="card"   style={{cursor:"pointer"}}>
                            <div className="card-text"  onClick={() => navigate(notificationMgs.onClickPath)}
>
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab='Read' key={1}>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2 text-primary ' style={{cursor:'pointer'}}  onClick={handlerDeleteAllRead}>Delete All Raed</h4> 
                </div>
                {
                    user?.seenotification.map(notificationMgs => (
                        <div className="card"  style={{cursor:"pointer"}}>
                            <div className="card-text"  
                            onClick={() => navigate(notificationMgs.onClickPath)}
                                >
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  );
};

export default NotificationPage;