const connectBtn = document.getElementById("connectBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
let counter = 0;
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
    contract = new web3.eth.Contract(ABI, contractAddress);
    connectBtn.innerHTML = "Connected";
    connectBtn.style.backgroundColor = "#40e36b";
    connectBtn.style.color = "#034f17";
    connectBtn.style.cursor = "not-allowed";
    connectBtn.classList.remove("scaling");
    if (counter == 0) ownerId();
    console.log("Successfully connected");
  } catch (error) {
    console.error(error);
    connectBtn.textContent = "Error Connected";
    alert("Error connecting to MetaMask!");
  }
});

function formatTimestamp(timestampInSeconds) {
  // Convert the timestamp to milliseconds
  const timestampInMilliseconds = BigInt(timestampInSeconds) * BigInt(1000);

  // Create a new Date object with the timestamp
  const date = new Date(Number(timestampInMilliseconds));

  // Format the date as a human-readable string
  const formattedDate = date.toLocaleString(); // You can customize the format as needed

  return formattedDate;
}
async function latestafno() {
  try {
    const latest = await contract.methods.latestAffidavitnumber().call();
    affnodisplay.textContent = `Registeration ID : ${latest}`;
    return latest;
  } catch (error) {
    console.log(error);
  }
}
async function ownerId() {
  try {
    const owneradd = await contract.methods.getOwner().call();
    console.log(`Owner Address: ${owneradd}`);
    alert(`Owner Address: ` + owneradd);
    counter += 1;
  } catch (error) {
    console.log(error);
  }
}
registerbtn.addEventListener("click", async () => {
  try {
    // Check if contract is initialized
    if (!contract) {
      console.error("Contract not initialized");
      return;
    }

    const oldName = document.getElementById('oldnameinput').value;
    const newName = document.getElementById('newnameinput').value;
    const idNo = parseInt(document.getElementById('idnoinput').value);
    const doclink = document.getElementById('doclinkinput').value;

    // Call the RegisterAffidavit method of the contract
    const transaction = await contract.methods.RegisterAffidavit(oldName, newName, idNo,doclink).send({
      from: window.ethereum.selectedAddress,
    });

    console.log("Transaction hash:", transaction.transactionHash);

    latestafno();

  } catch (error) {
    console.error(error);
  }
});





const fetchdisplay = document.getElementById('fetchdisplay');
const fetchdisplaybtn = document.getElementById('fetchdisplaybtn');

fetchdisplaybtn.addEventListener('click', async () => {
  try {
    console.log(window.ethereum.selectedAddress);
    popup.style.display = "block"; // Display the popup
    const afnoinputforfetch = document.getElementById('afnoinputforfetch').value;
    const fetcheddata = await contract.methods.getAffidavit(afnoinputforfetch).call();
    console.log(`\nID: ${fetcheddata[0]},Old Name: ${fetcheddata[1]},New Name: ${fetcheddata[2]},\nTimestamp : ${fetcheddata[3]} `);
    let timestring = formatTimestamp(fetcheddata[3]);
    if(formatTimestamp(fetcheddata[3]) == '1/1/1970, 5:30:00 AM'){
      timestring = 'NIL';
    }
    fetchdisplay.innerHTML = `<ul><li>ID No: ${fetcheddata[0]}</li> <li>Old Name: ${fetcheddata[1]}</li> <li>New Name: ${fetcheddata[2]}</li> <li>Timestamp :  ${timestring}[${fetcheddata[3]}]</li> <li>Status: ${fetcheddata[5]}</li></ul> `;
  } catch (error) {
    console.error(error);
    alert('Error occurred while fetching affidavit');
  }
});

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
      const affidavitfetch = await contract.methods.getApprovedAffidavit(fetcheddata[0][a]).call();
      fetchdisplay.innerHTML = `Updated Name: ${fetcheddata[2]}, Affidavits List: ${fetcheddata[0]} <br> Total No of Affidavits : ${fetcheddata[1]}`;
      fetchhistory.innerHTML = `<b>Affidavits:</b><br><ul><li>ID No: ${affidavitfetch[0]}</li> <li>Old Name: ${affidavitfetch[1]}</li> <li>New Name: ${affidavitfetch[2]}</li> <li>Timestamp :  ${formatTimestamp(affidavitfetch[3])}</li></ul><br><button id="prev">Previous</button><button id="next">Next</button>`;
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

document.getElementById('verifybtn').addEventListener('click', async () => {
  const verificatiohash = await generateSHA256Hash(document.getElementById('catdata').value);
if(document.getElementById('signatureforverify').value == verificatiohash)
alert('Verified Signature');
else 
alert('Not Matching');
})

// Close the popup when the close button is clicked
closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});
