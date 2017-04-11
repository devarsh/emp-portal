/* eslint-disable import/no-extraneous-dependencies, no-undef */
import fetchMock from 'fetch-mock'

const delay = () => new Promise(res => setTimeout(res, 3000))

if (__DEV__) {
  const dob = new Date(1986, 6, 23) // year, month, date i.e month starts from zero
  const doj = new Date(2008, 1, 15)
  fetchMock.mock(/(http:\/\/localhost:8081\/employee)[/.-\w\d]*/,
  delay().then(() => ({
    personal: {
      name: 'Kim H. Cedillo',
      shortName: 'Kim',
      gender: 'Female',
      birthDate: dob,
      bloodGroup: 'B-',
      maritialStatus: 'UnMarried',
      email: 'hhkim7@yopmail.com',
      contact: '+11(939)-1337932',
      emergencyContact: [
        {
          relation: 'Father',
          name: 'Cyril P. Hollis',
          contactNo: '+11(848)-1886133',
        },
        {
          relation: 'Mother',
          name: 'Anouk N. Swider',
          contactNo: '+11(232)-4552919',
        }
      ],
      address: [
        {
          type: 'Permanent',
          street1: '665 Benson Circle',
          street2: '618 S Drive',
          area: 'Satellite',
          city: 'Saxony-Anhalt',
          state: 'Yorkshire del Sur',
          country: 'England',
          pincode: '98677',
        },
        {
          type: 'Current',
          street1: '665 Benson Circle',
          street2: '618 S Drive',
          area: 'Satellite',
          city: 'Saxony-Anhalt',
          state: 'Yorkshire del Sur',
          country: 'England',
          pincode: '98677',
        }
      ]
    },
    finance: {
      bankName: 'ICICI',
      bankAccountNo: '4OEB6G6J113A101881',
      homeBranchName: 'Main',
      ifscCode: 'ICICI000034',
      pfNo: 'AHJ/DL3/354/3435535',
      esiNo: '23535355646SDSFD4',
    },
    work: {
      designation: 'Junior DBA',
      department: 'DataBase Admin',
      employeeId: 'ACU491',
      email: 'hhkim7@company.com',
      dateOfJoin: doj,
      contactNo: '+11(939)-337932',
    },
    docs: {
      panNo: 'AHJDF34545SDDS',
      adharCardNo: '1333 4565 6786',
      passportNo: 'PDSs32344',
    }
  })))
}
