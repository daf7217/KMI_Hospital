import React, { Component } from 'react';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Mainmenu extends Component {
    onPack = (event) => {
        event.preventDefault();
        this.props.history.push('/detail');
        const cookies = new Cookies();
        const user  = cookies.get('username');  
        swal("ยินดีต้อนรับคุณ " +user, "", "success");
    }
    onCovid = (event) => {
        event.preventDefault();
        this.props.history.push('/covid');
        const cookies = new Cookies();
        const user  = cookies.get('username');  
        swal("ยินดีต้อนรับคุณ " +user, "", "success");
    }
    render(){
        return(
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row">&nbsp;</div>
                <div className="row" style={{marginTop: '4%'}}>
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">&nbsp;</div>
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <button type="button" className="btn btn-outline-info btn-lg" style={{width: '100%',textAlign: 'center'}} onClick={this.onCovid}><FontAwesomeIcon icon={['fas', 'virus']} />&nbsp;ระบบตรวจสอบผู้ที่เดินทางมาจากพื้นที่เสี่ยง (COVID-KMH)&nbsp;<FontAwesomeIcon icon={['fas', 'virus']} /></button>
                        {/* <button type="button" class="btn btn-outline-primary">Primary</button>
                        <button type="button" class="btn btn-outline-secondary">Secondary</button>
                        <button type="button" class="btn btn-outline-success">Success</button>
                        <button type="button" class="btn btn-outline-danger">Danger</button>
                        <button type="button" class="btn btn-outline-warning">Warning</button>
                        <button type="button" class="btn btn-outline-light">Light</button>
                        <button type="button" class="btn btn-outline-dark">Dark</button> */}
                    </div>
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">&nbsp;</div>
                </div>   
            </div>
        )
    }
}
export default Mainmenu;