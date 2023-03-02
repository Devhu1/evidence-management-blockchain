import { ethers } from 'ethers';
import { useState } from 'react';
import configuration from './Complaint_ABI.json';
import { Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import './put-files';
 

const Complaint = () => {

  const contract_address = configuration.networks["5777"].address;
  const contract_abi = configuration.abi;
 
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [currentContractVal, setCurrentContractVal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [validated, setValidated] = useState(false);

  // Connection to Metamask
  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText("Connect Wallet");
        })
    } else {
      setErrorMessage("Need to install Metamask");
    }
  }
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  }
  
  async function transfer () {
  // const args = minimist(process.argv.slice(2))
  const fileData = {
    _: [ 'testile.txt' ],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg1NkNlNUViRjI1RDkzQkQ0MjVkODU0MkMwNWYxNTZFOEZiMUQ0MzgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQxMjE3MzA5MjYsIm5hbWUiOiJldmlkZW5jZXRva2VuIn0.W5O6x_h2rLxSLmL8f3BNZo80LTYIGQZ6TA0xi5fJJzY'
  }
  const args = fileData;
  const token = fileData.token

  console.log("The Arguments Passed are: ");
  // console.log(args);
  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  if (args._.length < 1) {
    return console.error('Please supply the path to a file or directory')
  }

  const storage = new Web3Storage({ token })
  const files = []

  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path)
    console.log("Fetched FIle Path= ", pathFiles);
    files.push(...pathFiles)
  }

  console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(files)
  console.log('Content added with CID:', cid)
}

const updateEthers = () => {

    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContracts = new ethers.Contract(contract_address, contract_abi, tempSigner);
    setContract(tempContracts);
  }
  
  let textarea;
  async function getTxn(){
    let resultObject = await provider.getTransaction("0x5e1180074f20d876d34b7be32ea18ff4f4f76882d586107a96e61f5e7b15e19a")
    console.log(resultObject);
  }
  const setHandler = async (event) => {

    event.preventDefault();
    getTxn()    
    
    let dataobject = event.target;
    let stationName = dataobject.station.value;
    let officer = dataobject.officer.value;
    let dateofComp = dataobject.date_of_comp.value;
    let victimName = dataobject.victim_name.value;
    let victimPhone = dataobject.victim_phone.value;
    let subject = dataobject.subject.value;
    let accusedName = dataobject.accused_name.value;
    console.log(stationName, officer, dateofComp, victimName, victimPhone, subject, accusedName, textarea);
    
    // const fileURL = '';
    // uploadToIPFS();
    // transfer(fileData)
    // console.log(event.target.setText.value);
    contract.setData(stationName, officer, dateofComp, victimName, victimPhone, accusedName, subject, textarea, 'filehash');
    // contract.setData('stationName', 'officer', 'dateofComp', 'victimName', 'victimPhone', 'accusedName', 'subject', 'details', 'filehash');
  }
   
  
  const getValue = async () =>{
    // let val = await contract.getValue();
    // setCurrentContractVal(val);
    // console.log(currentContractVal);
    console.log("GetValue button working");
  }
  return (
    <div>
      <h2>{"Complaint Portal"}</h2>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <h4>{defaultAccount}</h4>

      <Form noValidate validated={validated} onSubmit={setHandler}>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="station">
            <Form.Label>Police Station Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Area or Name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="officer">
            <Form.Label>Officer Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="On-Duty Officer"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4" controlId="date_of_comp">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="Date of Complaint" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="victim_name">
            <Form.Label>Victim Name</Form.Label>
            <Form.Control type="text" placeholder="Full Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4" controlId="victim_phone">
            <Form.Label>Victim Phone</Form.Label>
            <Form.Control type="text" placeholder="+91(Phone Number)" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4" controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" placeholder="" />
            <Form.Control.Feedback type="invalid">
              Subject can't be empty.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4" controlId="accused_name">
            <Form.Label>Accused Name</Form.Label>
            <Form.Control type="text" placeholder="" />
            <Form.Control.Feedback type="invalid">
              Subject can't be empty.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <InputGroup id='summary' onChange={e => {textarea = e.target.value;}}>
            <InputGroup.Text >With textarea</InputGroup.Text>
            <Form.Control as="textarea" aria-label="With textarea" />
          </InputGroup>
          <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
            />
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
}
export default Complaint;