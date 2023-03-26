import { Selector } from 'testcafe'; 
/*const fs = require('fs');
var fsp = require ('fs/promises');
let obj = {
  table: []
};
fixture('Test 1')
    .page('http://localhost:3001');
    test('Get List of Elements from API Endpoint', async t => {
    const endpointUrl = 'http://localhost:3000/devices';
    const response = await t.request(endpointUrl);
    
    //console.log(response)  
    //await t.wait(10000)
    // Assert that the 'elements' variable contains a list of elements
    await t.expect(response).ok();
    await t
        .expect(response.status).eql(200)
        .expect(response.statusText).eql('OK')
        .expect(response.headers).contains({ 'content-type': 'application/json; charset=utf-8' })
        const data = JSON.stringify(response.body);
        await fsp.writeFile("./users.json", data);
    //const nData = (JSON.parse(data))
    //console.log (nData);
    })


  fixture('Test 1b')
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
      
fixture('Test 2')
    .page('http://localhost:3001');

    test('Create a device on the UI and assert it exists.', async t => {
  // CREATE THE DEVICE
  
  const submitButton = Selector('.submitButton');
  await t.expect(submitButton.exists).ok();
  await t.click(submitButton);
  
  const systemNameInput = Selector('input[name="system_name"]');
  await t.expect(systemNameInput.exists).ok();
  const systemNameData = "testSystemName-Fergus3000";
  await t.typeText(systemNameInput, systemNameData);
  
  const systemNameDropdown = Selector("#type");
  await t.expect(systemNameDropdown.exists).ok();
  await t.click(systemNameDropdown).click(Selector('option[value="MAC"]'));  
  
  const hddCapacity = Selector('input[name="hdd_capacity"]')
  await t.expect(hddCapacity.exists).ok();
  await t.typeText(hddCapacity, '100')
  await t.expect(submitButton.exists).ok();
  await t.click(submitButton);
  //WE ASSERT IT EXISTS IN THE UI
  //await t.wait(10000)
  //const deviceName = Selector("span.device-name");
  //await t.expect(deviceName.exists).ok();
  //await t.expect(deviceName.textContent).contains(systemNameData);
  await t.expect(Selector('html').textContent).contains(systemNameData);   
});
*/
fixture('Test 3')
    .page('http://localhost:3001');
//Make an API call that renames the first device of the list to “Rename Device”.
test('Get List of Elements from API Endpoint', async t => {
  const endpointUrl = 'http://localhost:3000/devices';
  const response = await t.request(endpointUrl);
  const jsonData = response.body;
  const parameter = (jsonData[0]["id"]);
  //jsonData[0] = { id:parameter, system_name: "RENAMED DEVICE", type: "WINDOWS", hdd_capacity:'10'};
  jsonData[0] = { system_name: "RENAMED DEVICE"};
  // Stringify the updated JSON data

  const updatedData = JSON.stringify(jsonData);
  // PATCH the updated JSON data to the API endpoint
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
  const updatedResponse = await t.request('http://localhost:3000/devices/');
  const updatedJsonData = updatedResponse.body;
  console.log("####UPDATED???#####")
  console.log(updatedJsonData)
  console.log("####DEBUG#####")
  console.log(updatedJsonData[0]["system_name"])
  await t.expect(updatedJsonData[0]["system_name"]).eql('RENAMED DEVICE');
});

/*
//Reload the page and verify the modified device has the new name.

fixture('Test 4')
    .page('http://localhost:3001');
//Make an API call that deletes the last element of the list.
//Reload the page and verify the element is no longer visible and it doesn’t exist in the DOM.
*/