import React, { Component } from 'react';
import swal from 'sweetalert';
import swal2 from '@sweetalert/with-react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class covid extends Component {
    constructor(props){
        super(props);
        const cookies = new Cookies();
        this.accress = cookies.get('access');
    }
    onQuarantine = (event) => {
        event.preventDefault();
        this.props.history.push('/quarantine');
    }
    onPUI = (event) =>  {
        event.preventDefault();
        this.props.history.push('/pui');
    }
    onSearchData = (event) => {
        event.preventDefault();
        const dataSearch = document.getElementById("inputSearchData").value;
        if(dataSearch !== ""){
            //ค้นหาคนที่มาจากพื้นที่เสี่ยง

            //ค้นหาคนที่มาจากพื้นที่เสี่ยง
            const API = 'http://localhost:3001/';
            axios.get(API+'searchDataCovid',{ params: { username: dataSearch } })
            .then(res => {
                if(res.data === "noData"){
                    swal("ไม่พบข้อมูล", "คนป่วยไม่ได้มาจากพื้นที่เสี่ยงหรือเข้าเกณฑ์ PUI", "warning")
                    .then((value) => {
                        window.location.reload(false);
                    })
                }else{
                    //จัด format วันที่
                    const dateres = new Date(res.data[0].Date_comeArea);
                    const day = dateres.getDate();
                    const month = dateres.getMonth();
                    //วัน
                    if(day < 10) {
                        this.day = "0"+(day);
                    }else{
                        this.day = (day);  
                    }
                    //เดือน
                    if(month < 10) {
                        this.month = "0"+(month+1);
                    }else{
                        this.month = (month+1);  
                    }
                    const year = dateres.getFullYear()+543;
                    this.dateFormatThai = day+"/"+month+"/"+year;
                    //จัด format วันที่

                    // เช็ควันที่กักตัว
                    var one_day = 1000 * 60 * 60 * 24;
                    const dateCurrent = new Date();
                    const dateResponse = new Date(res.data[0].Date_comeArea);
                    const dateCal = Math.round(dateCurrent.getTime() - dateResponse.getTime()) / (one_day);
                    const dateQuarantine = dateCal.toFixed(0);
                    if(dateQuarantine <= 14){
                        this.Quarantine = "กักตัวได้ "+ dateQuarantine +" วัน";
                        this.colorQua = "red";
                    }else {
                        this.Quarantine = "กักตัวครบ 14 วันแล้ว";
                        this.colorQua = "green";
                    }
                    // เช็ควันที่กักตัว

                    swal2({
                        content :(
                            <div className="card text-white bg-info col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="card-header center">
                                    <span><h4>รายละเอียดคนที่มาจากพื้นที่เสี่ยง</h4></span>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>ชื่อ-สกุล :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].pname}{res.data[0].fname}&nbsp;{res.data[0].lname}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>อายุ :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].age}&nbsp;ปี</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>โรคประจำตัว :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].congenitalDisease}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>อาชีพ :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].occupation}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>ที่อยู่ ตามภูมิลำเนา :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].local_address}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>ที่อยู่ ที่เดินทางมา :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].comeFrom_address}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>อุณหภูมิ :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].temperature}&nbsp;องศาเซลเซียส</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>เบอร์โทร :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].tel}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>จำนวนผู้สัมผัสในบ้าน :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].numberOfTouch}&nbsp;คน</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>อาการทั่วไป :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].symptom}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>ที่มาของข้อมูล :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].dataSource}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>เบอร์โทรเจ้าหน้าที่ :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].staffNumber}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>เจ้าหน้าที่ผู้ควบคุม :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{res.data[0].staff}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>วันที่เข้ามาในพื้นที่ :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left"}}>{this.dateFormatThai}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <span style={{float: "right"}}>สถานะการกักตัว :</span>
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span style={{float: "left",color: this.colorQua}}><h4>{this.Quarantine}</h4></span>
                                    </div>
                                </div>
                            </div>
                        )
                    });
                }
            })//ค้นหาคนที่มาจากพื้นที่เสี่ยง
            

        }else{
            swal("ผิดพลาด", "กรุณากรอกชื่อที่จะค้นหาด้วยครับ", "error");
            document.getElementById("inputSearchData").value = "";
        }
    }

    render(){
        return(
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mx-auto">
                <div className="row">&nbsp;</div>
                <div className="row">&nbsp;</div>
                <div className="row" style={{marginTop: '4%',marginBottom: '2%'}}>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <div className="row card shadow-lg text-center">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 card-header bg-primary text-light text-bold text-center">
                                <span><h4>ค้นหาผู้ที่เดินทางมาจากพื้นที่เสี่ยงหรือผู้ป่วยเข้าเกณฑ์ PUI อำเภอคำม่วง</h4></span>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">&nbsp;</div>
                                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 form-group">
                                    <input className="form-control" id="inputSearchData" type="text" placeholder="กรุณาค้นหาด้วยชื่อ"/>
                                </div>
                                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">&nbsp;</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <button type="button" className="btn btn-primary" onClick={this.onSearchData}><FontAwesomeIcon icon={['fas', 'search']} />&nbsp;ค้นหา</button>
                                </div>
                            </div>
                            <div className="row">&nbsp;</div>
                        </div>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">&nbsp;</div>
                </div>
                {this.accress === 'superuser' || this.accress === 'admin' ? (
                <div className="row" style={{marginBottom: '1%'}}>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <button type="button" className="btn btn-outline-warning btn-lg" style={{width: '100%',textAlign: 'center'}} onClick={this.onQuarantine}><FontAwesomeIcon icon={['fas', 'plus']} />&nbsp;<FontAwesomeIcon icon={['fas', 'bus-alt']} />&nbsp;เพิ่มผู้ที่เดินทางมาจากพื้นที่เสี่ยง&nbsp;<FontAwesomeIcon icon={['fas', 'bus-alt']} /></button>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">&nbsp;</div>
                </div>
                )
                : (<div className="row"></div>)
                }

                {/* ## */}
      
                {this.accress === 'superuser' || this.accress === 'admin' ? (
                <div className="row">
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <button type="button" className="btn btn-outline-danger btn-lg" style={{width: '100%',textAlign: 'center'}} onClick={this.onPUI}><FontAwesomeIcon icon={['fas', 'plus']} />&nbsp;<FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />&nbsp;เพิ่มผู้ป่วยเข้าเกณฑ์ PUI&nbsp;<FontAwesomeIcon icon={['fas', 'exclamation-triangle']} /></button>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">&nbsp;</div>
                </div>
                )
                : (<div className="row"></div>)
                }
            </div>
        )
    }
}
export default covid;