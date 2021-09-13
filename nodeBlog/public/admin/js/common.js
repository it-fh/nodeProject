function serializeToJson(form) {
    let f = form.serializeArray();
     let obj = {};
     f.forEach(item => {
         obj[item.name] = item.value;
     });
     return obj;
 }
