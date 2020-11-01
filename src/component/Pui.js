import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Workbook from 'react-excel-workbook';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
class Pui extends Component {
    constructor(props){
        super(props);
        const cookies = new Cookies();
        const user  = cookies.get('username');
        this.state = {
            startDate: new Date(),
            userSave : user
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        })
    }

    render(){
        return(
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mx-auto">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="row card">
                            <div className="col-12 card-header">
                                    <span><h4>เพิ่มข้อมูลผู้ที่เข้าเกณฑ์ PUI</h4></span>
                            </div>
                            <br />
                            <form>
            
                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>คำนำหน้า : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="pname" type="text" placeholder="คำนำหน้า"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>ชื่อ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="fname" type="text" placeholder="ชื่อ"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>นามสกุล : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="lname" type="text" placeholder="นามสกุล"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>เพศ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="sex" id="inlineRadio1" value="1" checked/>
                                            <label class="form-check-label" for="inlineRadio1">ชาย</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="sex" id="inlineRadio2" value="2"/>
                                            <label class="form-check-label" for="inlineRadio2">หญิง</label>
                                        </div>
                                    </div>
                                    <div className="col-6 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>อายุ : </label>
                                    </div>
                                    <div className="col-4 input-group">
                                        <div className="col-4 input-group">
                                            <span><input className="col-6 form-control" type="text" id="age_y" placeholder="ปี" maxLength="3"/></span>
                                        </div>
                                        <div  className="col-7 input-group"> 
                                            <span><input className="col-6 form-control" type="text" id="age_m" placeholder="เดือน" maxLength="2"/></span>
                                        </div>
                                    </div>
                                    <div className="col-6 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>อาชีพ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="occupation" type="text" placeholder="อาชีพ"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>สัญชาติ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="nationality" type="text" placeholder="สัญชาติ"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>เชื้อชาติ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="race" type="text" placeholder="เชื้อชาติ"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>ที่อยู่ ตามภูมิลำเนา : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="address" type="text" placeholder="บ้านเลขที่/ตำบล/อำเภอ/จังหวัด"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span>&nbsp;&nbsp;<span>ตัวอย่าง : 92 หมู่ที่ 10 ตำบลทุ่งคลอง อำเภอคำม่วง จังหวัดกาฬสินธุ์</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>โทรศัพท์บ้าน : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="tel_home" type="text" placeholder="ตำบล/อำเภอ/จังหวัด"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span>&nbsp;&nbsp;<span>ตัวอย่าง : ชุมชนอินทามาระ 23 อำเภอพญาไท จังหวัดกรุงเทพมหานคร</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>โทรศัพท์ที่ทำงาน : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="tel_work" type="text" placeholder="อุณหภูมิที่วัดได้"/>
                                    </div>
                                    <div className="col-6 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>มือถือ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="tel" type="text" placeholder="เบอร์โทร"/>
                                    </div>
                                    <div className="col-6 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>วันที่เริ่มป่วย : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <DatePicker 
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            id="date_sick"
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>วันที่รับการรักษาครั้งแรก : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <DatePicker 
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            id="date_cure"
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>รพ.รับรักษาครั้งแรก : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="first_hos_cure" type="text" placeholder="ที่มาของข้อมูล"/>
                                    </div>
                                    <div className="col-6 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>จังหวัดรับรักษาครั้งแรก : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="first_hos_cure_province" type="text" placeholder="เบอร์โทรเจ้าหน้าที่"/>
                                    </div>
                                    <div className="col-6 form-group">&nbsp;</div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>รพ.รับรักษาปัจจุบัน : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="current_hos_cure" type="text" placeholder="ชื่อ - นามสกุล เจ้าหน้าที่ผู้ควบคุม"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>จังหวัดรักษาปัจจุบัน : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="current _hos_cure_province" type="text" placeholder="ชื่อ - นามสกุล เจ้าหน้าที่ผู้ควบคุม"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>อุณหภูมิแรกรับ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="temperature" type="text" placeholder="ชื่อ - นามสกุล เจ้าหน้าที่ผู้ควบคุม"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>อาการผู้ป่วย : </label>
                                    </div>
                                    <div className="col-4 form">
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom1" value="1"/>&nbsp;ไอ</label>&nbsp;&nbsp;&nbsp;
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom2" value="1"/>&nbsp;เจ็บคอ</label>&nbsp;&nbsp;&nbsp;
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom3" value="1"/>&nbsp;ปวดกล้ามเนื้อ</label>&nbsp;&nbsp;&nbsp;
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom4" value="1"/>&nbsp;มีน้ำมูก</label>&nbsp;&nbsp;&nbsp;
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom5" value="1"/>&nbsp;มีเสมหะ</label>&nbsp;&nbsp;&nbsp;
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom6" value="1"/>&nbsp;หายใจลำบาก (dyspnea)</label>&nbsp;&nbsp;&nbsp;
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom7" value="1"/>&nbsp;ปวดศีรษะ</label>&nbsp;&nbsp;&nbsp;
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom8" value="1"/>&nbsp;ถ่ายเหลว</label>&nbsp;&nbsp;&nbsp;
                                        <label class="checkbox-inline"><input type="checkbox" id="symptom9" value="1"/>&nbsp;ใส่เครื่องช่วยหายใจ</label>&nbsp;&nbsp;&nbsp;
                                        <span>อื่นๆ ระบุ&nbsp;&nbsp;<input className="form-control inline" size='30' id='symptom10' type='text' placeholder='ระบุอาการ'/></span>&nbsp;&nbsp;
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>เอ็กซเรย์ปอด (ครั้งแรก) : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="x-ray" id="inlineRadio1" value="1" />
                                            <label class="form-check-label" for="inlineRadio1">ทำ</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="x-ray" id="inlineRadio2" value="2" checked/>
                                            <label class="form-check-label" for="inlineRadio2">ไม่ทำ</label>
                                        </div>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>วันที่เอ็กซเรย์ปอด : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <DatePicker 
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            id="date_x-ray"
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>CBC (ครั้งแรก) วันที่ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <DatePicker 
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            id="date_cbc"
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>ผล Hb : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="cbc_Hb" type="text" placeholder="ผล Hb mg%"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>Hct : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="cbc_Hct" type="text" placeholder="Hct %"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>WBC : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="cbc_WBC" type="text" placeholder="WBC"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>Platelet Count : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="cbc_Platelet_Count" type="text" placeholder="Platelet Count"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>N : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="cbc_N" type="text" placeholder="%"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>L : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="cbc_L" type="text" placeholder="%"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>Atyp Lymph : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="cbc_Atyp_Lymph" type="text" placeholder="%"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>Mono : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="cbc_Mono" type="text" placeholder="%"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>influenza test : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="influenza_test" type="text" placeholder="วิธีการตรวจ Negative/Positive Flu A/Flu B"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>type specimen : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="type_specimen" type="text" placeholder="ชนิดสิ่งส่งตรวจ"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>วันที่เก็บ : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <DatePicker 
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            id="date_specimen"
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>วันที่ Admit : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <DatePicker 
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            id="admit_date"
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>การวินิจฉัยเบื้องต้น : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <input className="form-control" id="diag" type="text" placeholder="วินิจฉัย"/>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>การให้ยาต้านไวรัส : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="antiretroviralDrugs" id="inlineRadio1" value="1" />
                                            <label class="form-check-label" for="inlineRadio1">ให้</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="antiretroviralDrugs" id="inlineRadio2" value="2" checked/>
                                            <label class="form-check-label" for="inlineRadio2">ไม่ให้</label>
                                        </div>
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>วันที่ให้ยาต้านไวรัส : </label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <DatePicker 
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            id="date_ antiretroviralDrugs"
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>สถานะผู้ป่วย : </label>
                                    </div>
                                    <div className="col-4 dropdown">
                                        <select className="form-control" id="patientStatus">
                                            <option value="1">หาย</option>
                                            <option value="2">ยังรักษาอยู่</option>
                                            <option value="3">เสียชีวิต</option>
                                            <option selected value="4">ส่งตัวไป รพ. อื่น</option>
                                            <option value="5">อื่นๆ ระบุ</option>
                                        </select>
                                        <br/>
                                        <div><input className="form-control" id="diag" type="text" placeholder="ระบุ"/></div>
                                    </div>
                                    <div hidden ><input className="form-control" id="patientStatus" type="text" placeholder=""/></div>
                                    <div className="col-6 form-group"><span style={{color : "red"}}>*</span></div>
                                </div>

                                <div className="row">&nbsp;</div>
                                <div className="row">
                                    <div className="col-2 text-right form-group">
                                        <label>&nbsp;</label>
                                    </div>
                                    <div className="col-4 form-group">
                                        <button type="button" className="btn btn-success" onClick={this.onInsert}>บันทึกข้อมูล</button>
                                        &nbsp;
                                        <button type="button" className="btn btn-dark" onClick={this.onClear}>ล้างข้อมูล</button>
                                    </div>
                                    <div className="col-6 form-group">&nbsp;</div>
                                </div>

                                <div className="row">&nbsp;</div>
                                <div className="row">&nbsp;</div>
                                <div className="row">&nbsp;</div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Pui;