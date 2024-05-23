
const connectBtn = document.getElementById("connectBtn");
const registerbtn = document.getElementById("registerbtn");
const affnodisplay = document.getElementById('affnodisplay');
let web3; // Declare a variable for the web3 instance
let contract; // Declare a variable for the contract instance

async function generateSHA256Hash(data) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}


function formatTimestamp(timestampInSeconds) {
  // Convert the timestamp to milliseconds
  const timestampInMilliseconds = BigInt(timestampInSeconds) * BigInt(1000);
  
  // Create a new Date object with the timestamp
  const date = new Date(Number(timestampInMilliseconds));
  
  // Format the date as a human-readable string
  const formattedDate = date.toLocaleString(); // You can customize the format as needed
  
  return formattedDate;
}



connectBtn.addEventListener("click", async () => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);

    // Contract initialization code
    // ...

    const contractAddress = "0xFe4901D5C529e8f3AF3F338CC646BbE7DF0D74d6";
    const ABI = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "__Affidavitnumber",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "__timestamp",
            "type": "uint256"
          }
        ],
        "name": "AffidavitApproved",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_Affidavitnumber",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_approver",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_signature",
            "type": "string"
          }
        ],
        "name": "Approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_oldName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_newName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_idNo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_doclink",
            "type": "string"
          }
        ],
        "name": "RegisterAffidavit",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "__Affidavitno",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "__idno",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "__oldName",
            "type": "string"
          }
        ],
        "name": "RegisteringAffidavit",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_Affidavitnumber",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "reason",
            "type": "string"
          }
        ],
        "name": "reject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "affidavitnumber",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "reason",
            "type": "string"
          }
        ],
        "name": "rejectaffidavit",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "Affidavitno",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "idNo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "oldName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "newName",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isrejected",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "doclink",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "approver",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "signature",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "AffidavitsByPerson",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_bytes32",
            "type": "bytes32"
          }
        ],
        "name": "bytes32ToString",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_Affidavitnumber",
            "type": "uint256"
          }
        ],
        "name": "getAffidavit",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_idNo",
            "type": "uint256"
          }
        ],
        "name": "getAffidavitbyPerson",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_Affidavitnumber",
            "type": "uint256"
          }
        ],
        "name": "getApprovedAffidavit",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getOwner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getReturns",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "latestAffidavitnumber",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "arr",
            "type": "uint256[]"
          }
        ],
        "name": "Max",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
    console.log(`Deployed Account : ${window.ethereum.selectedAddress}`);
    contract = new web3.eth.Contract(ABI, contractAddress);
    connectBtn.innerHTML = "Connected";
    connectBtn.style.backgroundColor = "#40e36b";
    connectBtn.style.color = "#034f17";
    connectBtn.style.cursor = "not-allowed";
    connectBtn.classList.remove("scaling");
    console.log("Successfully connected");
  } catch (error) {
    console.error(error);
    connectBtn.textContent = "Error Connected";
    alert("Error connecting to MetaMask!");
  }
});


const getlatestafnobtn = document.getElementById('getlatestafnobtn');


getlatestafnobtn.addEventListener('click', async() => {
  try{
    const storedInteger = await contract.methods.getReturns().call();
    const latestafnodisplay = document.getElementById("latestafnodisplay");
    const latestafno =await contract.methods.latestAffidavitnumber().call();
     latestafnodisplay.textContent = `${latestafno} , Last Aprroved : ${storedInteger[0]}`;
     console.log("Approved:");
     storedInteger[1].forEach(element => {
         console.log(element);
     });
     
     console.log("Rejected:");
     storedInteger[2].forEach(element => {
         console.log(element);
     });
     //alert(storedArray);
  }catch(error){
    console.log(error);
    alert("Error in getting latest Affidavit Number:");
  }
});

const viewbtn = document.getElementById('viewbtn');

viewbtn.addEventListener('click', async () => {
  try{
  const affnoipforview = document.getElementById('affnoipforview').value;
  const regdaffidavit =await contract.methods.getAffidavit(affnoipforview).call();
  console.log(`Old Name: ${regdaffidavit[0]} , New Name: ${regdaffidavit[1]} , ID No: ${regdaffidavit[2]}`);
  const approvaldisplay = document.getElementById('approvaldisplay');
  if(regdaffidavit[3] == 0){
  popup.style.display = "block";
  fetchdisplay.innerHTML = `Old Name: ${regdaffidavit[1]} , New Name: ${regdaffidavit[2]} , ID No: ${regdaffidavit[0]},<br><a href='${regdaffidavit[4]}' target="_blank">View</a></br><button id="approvebtn">Approve</button><button id="rejectbtn">Reject</button>`;
  const approvebtn = document.getElementById('approvebtn');
  const rejectbtn = document.getElementById('rejectbtn');

  approvebtn.addEventListener('click' , async () => {
  const approver = document.getElementById('approver').value;
  try{
  const currentDate = new Date();
  const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Adding 1 to account for zero-based month indexing
const year = currentDate.getFullYear();

// Format day, month, and year components with leading zeros if needed
const formattedDay = String(day).padStart(2, '0');
const formattedMonth = String(month).padStart(2, '0');

// Construct the formatted date string
const doa = `${formattedDay}/${formattedMonth}/${year}`;
  const fetcheddata = await contract.methods.getAffidavit(affnoipforview).call();
  const signature = await generateSHA256Hash(affnoipforview+String(fetcheddata[0])+fetcheddata[1]+fetcheddata[2]+approver+doa)
  alert(`Registered: [${signature}] Concatenated Data: [${affnoipforview+String(fetcheddata[0])+fetcheddata[1]+fetcheddata[2]+approver+doa}]`);
  const transaction = await contract.methods.Approve(affnoipforview,approver,signature).send({
    from: window.ethereum.selectedAddress,
  });
  localStorage.setItem('myInteger',affnoipforview );
  console.log(`Transaction Hash: ${transaction.hash}`);
  }catch(error){
    console.log(error);
    alert("Error in Approving");
  }
  })
  rejectbtn.addEventListener('click',async () => {
  try{
    fetchdisplay.innerHTML = `<input type="text" id="reason" placeholder="Enter Query regarding Rejection"><button id="rejectbtnin">Reject</button>`;
    const rejectbtnin = document.getElementById('rejectbtnin');
    rejectbtnin.addEventListener('click',async() =>{
        const reason = `Rejected,${document.getElementById('reason').value}`;
        const transaction = await contract.methods.reject(affnoipforview,reason).send({
          from: window.ethereum.selectedAddress,
          });
            //console.log(`Transaction Hash: ${transaction.hash}`);
    })

  }catch(error){
    console.log(error);
    alert("Error in Rejecting");
  }
  })
  }
  else
  {
  popup.style.display = "block";
  fetchdisplay.innerHTML = `Old Name: ${regdaffidavit[1]} , New Name: ${regdaffidavit[2]} , ID No: ${regdaffidavit[0]} Already Approved at ${formatTimestamp(BigInt(regdaffidavit[3]))}`;
  }
}catch(error){
  console.log(error);
  alert("Error in viewing the Affidavit");
}
})

const fetchhistorydisplaybtn = document.getElementById('fetchhistorydisplaybtn');
const fetchhistory = document.getElementById('fetchhistory');

fetchhistorydisplaybtn.addEventListener('click', async () => {
  try {
    popup.style.display = "block";
    const idnoinputforfetch = document.getElementById('idnoinputforfetch').value;
    const fetcheddata = await contract.methods.getAffidavitbyPerson(idnoinputforfetch).call();
    const len = fetcheddata[0].length;
    if (len === 0) {
      // Handle case where no data is fetched
      fetchdisplay.innerHTML = "No data available.";
      return;
    }
    let a = 0;

    async function display(a) {
      const affidavitfetch = await contract.methods.getAffidavit(fetcheddata[0][a]).call();
      fetchdisplay.innerHTML = `Updated Name: ${fetcheddata[2]}, Affidavits List: ${fetcheddata[0]} <br> Total No of Affidavits : ${fetcheddata[1]}`;
      fetchhistory.innerHTML = `<b>Affidavits:</b><br><ul><li>ID No: ${affidavitfetch[0]}</li> <li>Old Name: ${affidavitfetch[1]}</li> <li>New Name: ${affidavitfetch[2]}</li> <li>Timestamp :  ${formatTimestamp(affidavitfetch[3])}[${affidavitfetch[3]}]</li></ul><br><button id="prev">Previous</button><button id="next">Next</button>`;
      document.getElementById('prev').addEventListener('click', () => {
        if (a > 0) {
          a--;
          display(a);
        }
      });
      document.getElementById('next').addEventListener('click', () => {
        if (a < len - 1) {
          a++;
          display(a);
        }
      });
    }
    await display(a);

    console.log(fetcheddata);
  } catch (error) {
    console.log(error);
    alert("Error in Fetching History");
  }
});



// Close the popup when the close button is clicked
closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});


