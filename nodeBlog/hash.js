const bcrypt = require('bcryptjs');
async function run(){
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash('123456',salt);
    const flag = await bcrypt.compare('123456',result);
    console.log(salt);
    console.log(result);
    console.log(flag);
}
run()