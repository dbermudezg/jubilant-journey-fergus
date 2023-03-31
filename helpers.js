import { t } from 'testcafe';
import { Selector } from 'testcafe'; 
//
export async function clickSubmitButton() 
    {
    const submitButton = Selector('.submitButton');
    await t.expect(submitButton.exists).ok();
    await t.click(submitButton);
    }

export async function enterSystemName(systemNameParam)
    {
    const systemNameInput = Selector('input[name="system_name"]');
    await t.expect(systemNameInput.exists).ok();
    const systemNameData = systemNameParam;
    await t.typeText(systemNameInput, systemNameData);
    }    

export async function selectValue(valueParam)
    {     
    const systemNameDropdown = Selector("#type");
    await t.expect(systemNameDropdown.exists).ok();
    await t.click(systemNameDropdown).click(Selector('option[value="'+valueParam+'"]'));  
    }

export async function inputHddCapacity(hddCapacityValue)
    {
    const hddCapacity = Selector('input[name="hdd_capacity"]')
    await t.expect(hddCapacity.exists).ok();
    await t.typeText(hddCapacity, hddCapacityValue)
    }
export async function validateElementExists(param2BValidated)
    {
    await t.expect(Selector('html').textContent).contains(param2BValidated);       
    }
