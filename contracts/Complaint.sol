//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Complaint{

    address public owner;
    string stationName;
    string onDutyOfficer;
    string date;
    string victimName;
    string victimPhone;
    string accusedName;
    string subject;
    string details;
    string fileHash;

    constructor() public{
        owner = address(0x0);
        stationName = "";
        onDutyOfficer = "";
        date = "";
        victimName = "";
        victimPhone = "";
        accusedName = "";
        subject = "";
        details = "";
        fileHash = "NULL";
    }

    function setData(
        string memory name,
        string memory officer, 
        string memory the_date,
        string memory vname,
        string memory vphone, 
        string memory aname,
        string memory the_subject,
        string memory the_details,
        string memory the_hash
    ) public{
        owner = msg.sender;
        stationName = name;
        onDutyOfficer = officer;
        date = the_date;
        victimName = vname;
        victimPhone = vphone;
        accusedName = aname;
        subject = the_subject;
        details = the_details;
        fileHash = the_hash;
    }

    function getValue() public view returns(string memory){
        return stationName;
    }
}