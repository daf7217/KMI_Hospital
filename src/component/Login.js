import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { icon, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../img/KMI.ico';
library.add(fas)
class Login extends Component {
    constructor(props){
        super(props);
        const cookies1 = new Cookies();
        cookies1.remove('username');
        cookies1.remove('dpCode');
        cookies1.remove('dpName');
        cookies1.remove('access');
    }
    state = {
        username : '',
        password : '',
        remember : '',
        formValid: true,
        id: "",
        dpCode: "",
        dpName: "",
        access: ""
    }
    onInputChangeName = (event) => {
        this.setState({
            username: event.target.value 
        })
        //console.log(this.state);
        this.state.username !== "" && this.state.password !== ""?
            this.setState({
                formValid: false
            })
        :
            this.setState({
                formValid: true
            }) 
    }
    onInputChangePass = (event) => {
        this.setState({
            password: event.target.value 
        })
        //console.log(this.state);
        this.state.username !== "" && this.state.password !== ""?
            this.setState({
                formValid: false
            })
        :
            this.setState({
                formValid: true
            }) 
    }
    onSubmitLogin = (event) => {
        event.preventDefault();
        
        if(document.getElementById('username') && document.getElementById('password') !== ''){

            this.setState({
                username: document.getElementById('username'),
                password: document.getElementById('password') 
            })

            const API = 'http://localhost:3001/';
            const user = this.state.username;
            const pass = this.state.password;
            
            if(document.getElementById('customControlInline').checked == true){
                this.state.remember = 'true';    
            }else{
                this.state.remember = 'false';  
            }
            const remem = this.state.remember;

            this.setState({
                username: user,
                password: pass,
                remember: remem
            })
            axios.get(API+'detail',{ params: { username: user,password: pass,remember: remem } })
            .then(res => {
                if(res.data === "noData"){
                        swal("ผิดพลาด", "ชื่อและรหัสผ่านไม่ถูกต้องกรุณาลองอีกครั้งหรือติดต่อกลุ่มงานเทคโนโลยีสารสนเทศ", "error")
                        .then((value) => {
                            window.location.reload(false);
                        })
                }else{
                    console.log(res.status);
                    let obj = JSON.stringify(res.data);
                    let data = JSON.parse(obj);
                    this.setState({
                        id: data[0].id,
                        username: data[0].user,
                        dpCode: data[0].departmentCode,
                        dpName: data[0].departmentName,
                        access: data[0].access
                    })
                    var a = this.state.id;
                    var id = JSON.stringify(a);

                    var b = this.state.username;
                    var username = JSON.stringify(b);

                    var c = this.state.dpCode;
                    var dpCode = JSON.stringify(c);

                    var d = this.state.dpName;
                    var dpName = JSON.stringify(d);

                    var e = this.state.access;
                    var access = JSON.stringify(e);
                    
                    const cookies = new Cookies();
                    cookies.set('id', id.split('"').join(''));
                    cookies.set('username', username.split('"').join(''));
                    cookies.set('dpCode', dpCode.split('"').join(''));
                    cookies.set('dpName', dpName.split('"').join(''));
                    cookies.set('access', access.split('"').join(''));

                    this.props.history.push({ pathname: '/mainmenu'})
                }
            }).catch((err) => console.error(
                swal("เชื่อมต่อ API ไม่ได้", "กรุณาติดต่อกลุ่มงานเทคโนโลยีสารสนเทศ", "warning")
                .then((value) => {
                    window.location.reload(false);
                })
            ));
        }
    }
    render () {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{marginTop: "4%"}}>
                <center>
                <div className="row" style={{marginTop: '8%'}}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 card shadow-lg p-4 mb-5 bg-white rounded " style={{width: '35%'}}>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-black"><h2><center><img className="photo" src={logo} alt="Logo" />&nbsp;&nbsp;Member Login</center></h2></div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 card-body" style={{height: "300px",backgroundColor: 'sliver'}}>
                                <div className="row">&nbsp;</div>
                                <form onSubmit={this.onSubmitLogin}>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                                        <div className="input-group mb-2">
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="username"><FontAwesomeIcon icon={['fas', 'user']} />&nbsp;&nbsp;&nbsp;&nbsp;</span>
							            </div>
                                            <input type="text" 
                                                className="form-control" 
                                                aria-label="Default" 
                                                aria-describedby="inputGroup-sizing-default"
                                                onChange={this.onInputChangeName} placeholder="ลงชื่อใช้งาน"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="password"><FontAwesomeIcon icon={['fas', 'key']} />&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            </div>
                                            <input type="password" 
                                                className="form-control" 
                                                aria-label="Default" 
                                                aria-describedby="inputGroup-sizing-default"
                                                onChange={this.onInputChangePass} placeholder="รหัสผ่าน"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                                        <div className="custom-control custom-checkbox" style={{textAlign: 'left', marginLeft: '1%'}}>
                                            <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                                            <label className="custom-control-label" htmlFor="customControlInline">จำรหัสผ่าน</label>
                                        </div>
						            </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center submit">
                                        <button style={{width: '100%'}} type="submit" 
                                                className="btn btn-primary my-1" 
                                                disabled = {this.state.formValid}>
                                                เข้าสู่ระบบ</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </center>
            </div>
        )
    }
}
export default Login;
