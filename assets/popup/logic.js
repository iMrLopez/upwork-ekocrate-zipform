const Swal = window.Swal;
const firebase = window.firebase;

var firebaseConfig = {
  // CHANGEME when deployed
  apiKey: "AIzaSyDY7S3DFb3_ATZyEMnpUEVKxKRCQcd9nYw",
  authDomain: "myndsit.firebaseapp.com",
  databaseURL: "https://myndsit.firebaseio.com",
  projectId: "myndsit",
  storageBucket: "myndsit.appspot.com",
  messagingSenderId: "131929940359",
  appId: "1:131929940359:web:996f95faa9c28698baf322",
  measurementId: "G-0X4XGDDWSR"
};

const zip12mi = ['97062', '97224', '97035', '97070', '97034', '97068', '97140', '97036', '97223', '97008', '97219', '97079', '97268', '97281', '97239', '97267', '97078', '97027', '97007', '97269', '97222', '97075', '97076', '97077', '97298', '97002', '97005', '97221', '97258', '97225', '97202', '97020', '97201', '97205', '97003', '97206', '97132', '97291', '97204', '97013', '97296', '97294', '97293', '97292', '97290', '97286', '97283', '97207', '97208', '97228', '97238', '97240', '97242', '97251', '97253', '97254', '97256', '97282', '97280', '97214', '97015', '97006', '97045', '85301', '85318', '85311', '85312', '85303', '85302', '85031', '85019', '85033', '85051', '85304', '85305', '85017', '85380', '85035', '85345', '85015', '85385', '85021', '85381', '85029', '85306', '85013', '85005', '85037', '85372', '85012', '85376', '85053', '85351', '85009', '85307', '85043', '85014', '85363', '85039', '85020', '85392', '85023', '85007', '85382', '85003', '85026', '85065', '85070', '85066', '85064', '85082', '85063', '85069', '85062', '85067', '85002', '85079', '85078', '85076', '85075', '85074', '85073', '85072', '85071', '85061', '85060', '85068', '85080', '85001', '85010', '85011', '85030', '85036', '85038', '85046', '85308', '85004', '85335', '85006', '85353', '85016', '85022', '85329', '85028', '85027', '85309', '85310', '85041', '85032', '83704', '83713', '83703', '83722', '83719', '83717', '83711', '83707', '83701', '83724', '83726', '83799', '83756', '83735', '83732', '83715', '83729', '83728', '83720', '83725', '83709', '83706', '83680', '83705', '83702', '83646', '83642', '83714', '83708', '83712', '83616', '83669'];
const zip1230mi = ['97209', '97086', '97123', '97232', '97266', '97227', '97215', '97210', '97032', '97229', '97212', '97216', '97213', '97115', '97129', '97137', '97236', '97042', '97211', '97217', '97089', '97071', '97220', '97233', '97004', '97218', '97250', '97203', '97252', '97113', '97124', '97230', '97114', '97030', '97127', '97026', '98666', '98668', '98687', '98664', '97080', '97024', '98661', '98683', '98663', '97362', '97009', '97022', '97373', '98684', '98665', '97060', '97111', '98660', '97231', '97017', '98662', '98685', '97305', '97148', '97133', '98682', '98686', '97119', '98607', '97303', '97038', '97128', '97106', '97375', '97304', '97023', '97055', '97307', '98606', '97101', '97116', '97381', '97125', '85018', '85379', '85034', '85253', '85008', '85340', '85040', '85395', '85083', '85378', '85355', '85024', '85374', '85339', '85375', '85042', '85254', '85323', '85085', '85050', '85388', '85251', '85048', '85257', '85250', '85281', '85383', '85252', '85261', '85267', '85269', '85271', '85287', '85054', '85045', '85338', '85258', '85044', '85260', '85282', '85280', '85285', '85283', '85373', '85201', '85284', '85387', '85202', '85266', '85259', '85203', '85211', '85214', '85216', '85274', '85275', '85277', '85210', '85086', '85224', '85256', '85396', '85255', '85226', '85246', '85327', '85213', '85204', '85233', '85377', '85225', '85244', '85268', '85331', '85299', '85087', '85361', '85286', '85205', '85234', '85248', '85296', '85206', '83687', '83653', '83652', '83634', '83651', '83644', '83605', '83686', '83716', '83636', '83606', '83607', '83641', '83617', '83630', '83629', '83631', '83656', '83666', '83626'];

// Validates the input value to check if it is a zip code
function validateZip(ev) {
  var message;
  const zip = ev.target.value;
  if (!/^\d{5}(-\d{4})?$/.test(zip)) {
    message = "Invalid Zip Code";
  } else {
    message = undefined;
  }

  document.getElementById(ev.target.id + "_msg").textContent = message;
}

// Validates the input to check if its an actual email
function ValidateEmail(ev) {
  var email = ev.target.value;
  var message;
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    message = "Invalid email address";
  } else {
    message = undefined;
  }
  document.getElementById("email_msg").textContent = message;
}

// Validate that the fields have the right syntax
function fieldsAreValid() {
  // Check for field sintax validation errors
  const validationEmail = document.getElementById("email_msg").textContent;
  const validationDropZip = document.getElementById("drop_zip_msg").textContent;
  const validationPickZip = document.getElementById("pick_zip_msg").textContent;
  const validationResult =
    !validationEmail && !validationDropZip && !validationPickZip ? true : false;

  // Check for field completeness validation errors
  const valueEmail = document.getElementById("email").value;
  const valueDropZip = document.getElementById("drop_zip").value;
  const valuePickZip = document.getElementById("pick_zip").value;
  const valueResult = valueEmail && valueDropZip && valuePickZip ? true : false;

  return valueResult && validationResult;
}

// Redirect the user to the right address
function redirectUserToSite() {
  let target = new URLSearchParams(window.location.search).get('beds');
  switch (target) {
    case 'studio':
      target = '/apartmentstudio';
      break;
    case '12':
      target = '/12bedrooms';
      break;
    case '34':
      target = '/34bedrooms';
      break;
    case '5+':
      target = '/5bedrooms';
      break;
  }
  window.location.href = '/path'; //relative to domain
}

// Check if the entered zips are in the service area
function zipsInServiceArea() {
  const valueDropZip = document.getElementById("drop_zip").value;
  const valuePickZip = document.getElementById("pick_zip").value;
  return false;
}

// Actually adding the data to firestore
const addDataToDb = () => {
  if (fieldsAreValid() && zipsInServiceArea()) {
    firebase
      .firestore()
      .collection("emails")
      .add({
        email: document.getElementById("email").value,
        zip_drop: document.getElementById("drop_zip").value,
        zip_pick: document.getElementById("pick_zip").value,
        location: window.location.href,
        timestamp: new Date().toISOString()
      });
    this.redirectUserToSite();
  }
};

firebase.initializeApp(firebaseConfig);