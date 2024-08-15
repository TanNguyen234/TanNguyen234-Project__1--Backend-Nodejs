//Permissions
const tablePermissions = document.querySelector('[table-permissions]');
if(tablePermissions) {
    const buttonSubmit = document.querySelector('[button-submit]');
    buttonSubmit.addEventListener('click', (e) => {
       let permissions = []

       const rows = tablePermissions.querySelectorAll('[data-name]')

       rows.forEach(row => {
        const name = row.getAttribute('data-name')
        const inputs = row.querySelectorAll('input');
        if(name === 'id') {
            inputs.forEach(input => {
                const id = input.value
                permissions.push({
                    id: id,
                    permissions: []
                })
            })
        } else {
            inputs.forEach((input, index) => {
                const checked = input.checked;
                if(checked) {
                    permissions[index].permissions.push(name)
                }
            })
        }
       });
       if(permissions.length > 0) {
        const form_change_permissions = document.getElementById('form-change-permission')
        const inputPermission = form_change_permissions.querySelector('input')
        inputPermission.value = JSON.stringify(permissions)
        form_change_permissions.submit()
       }
    })
}
//End Permissions
//Permission Data Default
const dataRecords = document.querySelector('div[data-records]')
if(dataRecords) {
    data = JSON.parse(dataRecords.getAttribute('data-records'))

    const tablePermissions = document.querySelector('[table-permissions]'); 

    data.forEach((item, index) => {
        const permissions = item.permissions;

        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`)
            
            const inputs = row.querySelectorAll(`input`)
            
            inputs[index].checked = true;
        })
    })
}
//End Permission Data Default