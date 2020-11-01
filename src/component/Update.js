import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'universal-cookie';
class Update extends Component {
    constructor(props){
        super(props);
        this.state = {
            colors: "card text-white bg-warning mb-3",
            name: "",
            user: "",
            id: "",
            code: "",
            access: "",
            responseData : []
         }
         const cookies = new Cookies();
         const name  = cookies.get('username');
         const dpCode = cookies.get('dpCode');
         const dpName = cookies.get('dpName');
         const access = cookies.get('access');
         const API = 'http://localhost:3001/';
         axios.get(API+"detail/pack",{ params: { dpCode: dpCode } })
         .then(res => {
             if(res.data === "noData"){
                 swal("ผิดพลาด", "ไม่พบรายการเวชภัณฑ์", "error")
             }else{
                this.setState({ 
                    name: dpName,
                    user: name,
                    code: dpCode,
                    access: access,
                    responseData: res.data 
                });
             }
         })
    }
    alertBox = (event) => {
        swal({
            title: "คุณต้องการปรับปรุงข้อมูลใช่หรือไม่?",
            text: "เมื่อคุณตอบตกลงแล้วระบบจะทำการปรับปรุงข้อมูลที่คุณแก้ไขล่าสุด",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("ปรับปรุงข้อมูลเรียบร้อยแล้ว ขอบคุณครับ!!", {
                icon: "success",
              });
              this.props.history.push('/detail');
            } else {
              swal("ยกเลิกการปรับปรุงข้อมูล ขอบคุณครับ");
            }
          });
    }
    restoreData = (event) => {
        window.location.reload();
    }
    updateData = (event) => {
    }
    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mx-auto card">
                <div className="card-header center">
                    <span><h4>ปรับปรุงจำนวนวัสดุทางการแพทย์และเวชภัณฑ์มิใช่ยา</h4></span>
                </div>
                <div className="card-body">
                    <form onSubmit={this.updateData}>
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">ลำดับ</th>
                                    <th hidden>id</th>
                                    <th hidden>departmentCode</th>
                                    <th scope="col">รายการ</th>
                                    <th scope="col">จำนวนเบิก</th>
                                    <th scope="col">จำนวนจ่าย</th>
                                    <th scope="col">จำนวนคงเหลือ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.responseData.map((data,i) =>(
                                <tr key={i}>
                                    <th scope="row">{i+1}</th>
                                    <td hidden>{data.id}</td>
                                    <td hidden>{data.departmentCode}</td>
                                    <td>{data.name}</td>
                                    <td><input type="text" id="withdraw" className="form-control" maxLength="3" defaultValue={data.withdraw} size="5"/></td>
                                    <td><input type="text" id="dispense" className="form-control" maxLength="3" defaultValue={data.dispense} size="5"/></td>
                                    <td><input type="text" id="remaining" className="form-control" maxLength="3" defaultValue={data.withdraw-data.dispense} size="5" disabled/></td>
                                </tr>
                                ))}
                                <tr>
                                    <th scope="row">
                                        <button type="submit" className="btn btn-success">บันทึก</button>&nbsp;
                                        <button type="button" className="btn btn-warning" onClick={this.restoreData}>กู้คืน</button>
                                    </th>
                                    <th>&nbsp;</th>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div>&nbsp;</div>
                </div>
            </div>    
        )
    }
}
export default Update;