import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'universal-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
class Quarantine extends Component {
    constructor(props){
        super(props);
        const cookies = new Cookies();
        const user  = cookies.get('username');
        this.state = {
            startDate: new Date(),
            pname : "",
            fname : "",
            lname : "",
            age : "",
            congenitalDisease : "",
            occupation : "",
            local_address : "",
            comeFrom_address : "",
            temperature : "",
            tel : "",
            numberOfTouch : "",
            symptom : "",
            dataSource : "",
            staffNumber : "",
            staff : "",
            Date_comeArea : "",
            userSave : user
        };
        this.handleChange = this.handleChange.bind(this);
        this.selectDate = this.selectDate.bind(this);
    }
    handleChange(date) {
        this.setState({
          startDate: date
        })
    }
    selectDate = (e)  => {
        e.preventDefault();
        console.log(this.state.startDate)
    }
    onClear = (e) => {
        e.preventDefault();
        window.location.reload();
    }
    onInsert = (event) => {
        const Cdatepicker = document.getElementById("datepicker").value;
        const Cpname = document.getElementById("pname").value;
        const Cfname = document.getElementById("fname").value;
        const Clname = document.getElementById("lname").value;
        const Coccupation = document.getElementById("occupation").value;
        const Clocal_address = document.getElementById("local_address").value;
        const CcomeFrom_address = document.getElementById("comeFrom_address").value;
        const CnumberOfTouch = document.getElementById("numberOfTouch").value;
        const Csymptom = document.getElementById("symptom").value;
        const Cstaff = document.getElementById("staff").value;
        if(Cdatepicker === '' || Cpname === '' || Cfname === '' || Clname === '' || Coccupation === ''
        || Clocal_address === '' || CcomeFrom_address === '' || CnumberOfTouch === '' || Csymptom === '' || Cstaff === ''){
            swal("ผิดพลาด", "กรุณาตรวจสอบข้อมูลว่าถูกต้องครบถ้วนหรือไม่ตามเครื่องหมายดอกจัน (*)", "warning")
        }else{
        swal({
            title: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
            text: "โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดบันทึก",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const pname = document.getElementById("pname").value;
                const fname = document.getElementById("fname").value;
                const lname = document.getElementById("lname").value;
                const age = document.getElementById("age").value;
                const congenitalDisease = document.getElementById("congenitalDisease").value;
                const occupation = document.getElementById("occupation").value;
                const local_address = document.getElementById("local_address").value;
                const comeFrom_address = document.getElementById("comeFrom_address").value;
                const temperature = document.getElementById("temperature").value;
                const tel = document.getElementById("tel").value;
                const numberOfTouch = document.getElementById("numberOfTouch").value;
                const symptom = document.getElementById("symptom").value;
                const dataSource = document.getElementById("dataSource").value;
                const staffNumber = document.getElementById("staffNumber").value;
                const staff = document.getElementById("staff").value;
                const datepicker = document.getElementById("datepicker").value;

                this.setState({
                    pname : pname,
                    fname : fname,
                    lname : lname,
                    age : age,
                    congenitalDisease : congenitalDisease,
                    occupation : occupation,
                    local_address : local_address,
                    comeFrom_address : comeFrom_address,
                    temperature : temperature,
                    tel : tel,
                    numberOfTouch : numberOfTouch,
                    symptom : symptom,
                    dataSource : dataSource,
                    staffNumber : staffNumber,
                    staff : staff, 
                    Date_comeArea : datepicker
                })

                const dataObj = {
                    pname : this.state.pname,
                    fname : this.state.fname,
                    lname : this.state.lname,
                    age : this.state.age,
                    congenitalDisease : this.state.congenitalDisease,
                    occupation : this.state.occupation,
                    local_address : this.state.local_address,
                    comeFrom_address : this.state.comeFrom_address,
                    temperature : this.state.temperature,
                    tel : this.state.tel,
                    numberOfTouch : this.state.numberOfTouch,
                    symptom : this.state.symptom,
                    dataSource : this.state.dataSource,
                    staffNumber : this.state.staffNumber,
                    staff : this.state.staff,
                    Date_comeArea : this.state.Date_comeArea,
                    userSave : this.state.userSave
                }

                const API = 'http://localhost:3001/';
                //console.log(dataObj);
                axios.post(API+'insertRiskArea',dataObj)
                .then(res => {
                    if(res.data === "insertError"){
                        swal("ผิดพลาด", "ล้มเหลวการบันทึกข้อมูลผิดพลาด", "error")
                        .then((value) => {
                            window.location.reload();
                        })
                    }else if(res.data === "insertSuccess"){
                        swal("บันทึกข้อมูลเรียบร้อยแล้ว ขอบคุณครับ!!", {
                            icon: "success",
                        }); 
                        this.props.history.push('/covid');   
                    }
                })
                
            } else {
              swal("ยกเลิก","ยกเลิกการบันทึกข้อมูล ขอบคุณครับ", "success")
              .then((value) => {
                //window.location.reload();
              })
            }
          }); 
        }
    }
    render(){
        return(
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row">&nbsp;</div>
                <div className="row">
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">&nbsp;</div>
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 overflow-auto">
                        <div className="row card shadow-lg border border-info" style={{marginTop: '5%'}}>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-info text-light card-header">
                                    <span><h4>เพิ่มข้อมูลผู้ที่เดินทางมาจากพื้นที่เสี่ยง</h4></span>
                            </div>
                            <br />
                            <form>
                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">วันที่เข้ามาในพื้นที่ : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <DatePicker 
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            id="datepicker"
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">คำนำหน้า : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="pname" type="text" placeholder="คำนำหน้า"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">ชื่อ : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="fname" type="text" placeholder="ชื่อ"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">นามสกุล : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="lname" type="text" placeholder="นามสกุล"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">อายุ : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="age" type="text" placeholder="อายุ"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">โรคประจำตัว : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="congenitalDisease" type="text" placeholder="โรคประจำตัว"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">อาชีพ : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="occupation" type="text" placeholder="อาชีพ"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">ที่อยู่ ตามภูมิลำเนา : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="local_address" type="text" placeholder="บ้านเลขที่/ตำบล/อำเภอ/จังหวัด"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span>&nbsp;&nbsp;<span className="text-success">ตัวอย่าง : 92 หมู่ที่ 10 ตำบลทุ่งคลอง อำเภอคำม่วง จังหวัดกาฬสินธุ์</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">ที่อยู่ ที่เดินทางมา : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="comeFrom_address" type="text" placeholder="ตำบล/อำเภอ/จังหวัด"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span>&nbsp;&nbsp;<span className="text-success">ตัวอย่าง : ชุมชนอินทามาระ 23 อำเภอพญาไท จังหวัดกรุงเทพมหานคร</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">อุณหภูมิ : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="temperature" type="text" placeholder="อุณหภูมิที่วัดได้"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">เบอร์โทร : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="tel" type="text" placeholder="เบอร์โทร"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">จำนวนผู้สัมผัสร่วมบ้าน : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="numberOfTouch" type="text" placeholder="จำนวน (คน)"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">อาการทั่วไป : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="symptom" type="text" placeholder="อาการ"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">ที่มาของข้อมูล : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="dataSource" type="text" placeholder="ที่มาของข้อมูล"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">เบอร์โทรเจ้าหน้าที่ : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="staffNumber" type="text" placeholder="เบอร์โทรเจ้าหน้าที่"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <p className="font-weight-bold text-secondary">เจ้าหน้าที่ผู้ควบคุม : </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <input className="form-control border border-info" id="staff" type="text" placeholder="ชื่อ - นามสกุล เจ้าหน้าที่ผู้ควบคุม"/>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right form-group">
                                        <label>&nbsp;</label>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 form-group">
                                        <button type="button" className="btn btn-success" onClick={this.onInsert}>บันทึกข้อมูล</button>
                                        &nbsp;
                                        <button type="button" className="btn btn-dark" onClick={this.onClear}>ล้างข้อมูล</button>
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group">&nbsp;</div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">&nbsp;</div>
                </div>
            </div>
            
        )
    }
}
export default Quarantine;