import { Selector } from 'testcafe'; 
import {clickSubmitButton, enterSystemName, selectValue, inputHddCapacity, validateElementExists} from './helpers.js';
const fs = require('fs');
var fsp = require ('fs/promises');
let obj = {
  table: []
          };
fixture('Test 1')
    .page('http://localhost:3001');
    test('Get List of Elements from API Endpoint', async t => {
    const endpointUrl = 'http://localhost:3000/devices';
    const response = await t.request(endpointUrl);
    await t.expect(response).ok();
    await t
        .expect(response.status).eql(200)
        .expect(response.statusText).eql('OK')
        .expect(response.headers).contains({ 'content-type': 'application/json; charset=utf-8' })
        const data = JSON.stringify(response.body);
        await fsp.writeFile("./users.json", data);
    })
      .page('http://localhost:3001');
      const data = require("./users.json");
            fixture `Data-Driven Tests: From the saved lists verify the data exists in the UI` 
        data.forEach(data => {
        test(`Check '${data.system_name}'`, async t => {
              await t
                  .expect(Selector('html').textContent).contains(data.system_name);
                   });
        test(`Assert '${data.type}'`, async t => {
              await t
                   .expect(Selector('html').textContent).contains(data.type);
                  });
        test(`Verify '${data.hdd_capacity}'`, async t => {
              await t
                  .expect(Selector('html').textContent).contains(data.hdd_capacity);
      });
    })
    test('Create a device on the UI and assert it exists.', async t => {
  // CREATE THE DEVICE
  //await t.wait(10000)
  const newElem="Fergus-Device-3000"
  await clickSubmitButton();
  await enterSystemName(newElem);
  await selectValue("MAC");
  await inputHddCapacity("100");
  await clickSubmitButton();
  
  //WE ASSERT IT EXISTS IN THE UI
  await validateElementExists(newElem);
});

//Make an API call that renames the first device of the list to “Rename Device”.
test('Get List of Elements from API Endpoint', async t => {
  const endpointUrl = 'http://localhost:3000/devices';
  const response = await t.request(endpointUrl);
  const jsonData = response.body;
  const parameter = (jsonData[0]["id"]);
  jsonData[0] = { system_name: "RENAMED DEVICE"};
  const updatedData = JSON.stringify(jsonData);
  const url = 'http://localhost:3000/devices/'+parameter
  await t.request({
    method: 'PUT',
    url:  url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: updatedData
  });

  // Assert that the first element of the JSON data was successfully updated
  const updatedResponse = request('http://localhost:3000/devices/');
  const updatedJsonData = updatedResponse.body;
  await t.expect(updatedJsonData[0]["system_name"]).eql('RENAMED DEVICE');
});

//Make an API call that deletes the last element of the list.


//Assert stuff
test('Get List of Elements from API Endpoint', async t => {
const endpointUrl = 'http://localhost:3000/devices';
const response = await t.request(endpointUrl);
const jsonData = response.body;
const ultimo = JSON.stringify(jsonData.slice(-1)); 
console.log("##############################"+ultimo)
  await t
  .expect(Selector('html').textContent).contains(ultimo.system_name);
await t
   .expect(Selector('html').textContent).contains(ultimo.type);
await t
  .expect(Selector('html').textContent).contains(ultimo.hdd_capacity);
  });
