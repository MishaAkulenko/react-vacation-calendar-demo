
export default (url, params)=>{
    let fakeDataStore = {
        '/login'(){
            return {
                login: params.login,
                vacation_days: 14,
                first_vacation_interval: false,
            }
        },
        '/logout'(){
            return {
                logout: true
            }
        },
        '/users'(){
            return [
                {login: 'Игорь', reserved:[...generateFakeDateList(18,30,0)], color:'#4cc1bc'},
                {login: 'Дмитрий', reserved:[...generateFakeDateList(10,20,0)], color:'#7C7F6D'},
                {login: 'Владимир', reserved:[...generateFakeDateList(10,17,0)], color:'#4a7ac1'},
                {login: 'Михаил', reserved:[...generateFakeDateList(15,29,0)], color:'#89a7c1'},
            ]
        },
        '/save_vacation'(){
            return {period: params, status: 'wait'}
        }
    };
    function* generateFakeDateList(begin, end, month){
        for (let i = begin; i <end; i++) yield new Date(2020, month, i )
    }
    function getFakeDataByUrl() {
        return fakeDataStore[url]()
    }

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(getFakeDataByUrl())
        }, 300)
    })
}
