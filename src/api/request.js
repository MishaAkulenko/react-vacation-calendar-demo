
export default (url, params)=>{
    let fakeDataStore = {
        '/login'(){
            return {
                login: params.login,
                vacation_days: 7,
            }
        },
        '/users'(){
            return [
                {login: 'Игорь', reserved:[...generateFakeDateList(0,7,0)], color:'#4cc1bc'},
                {login: 'Дмитрий', reserved:[...generateFakeDateList(4,9,0)], color:'rgba(28,26,20,0.7)'},
                {login: 'Владимир', reserved:[...generateFakeDateList(6,12,0)], color:'#4a7ac1'},
                {login: 'Михаил', reserved:[...generateFakeDateList(7,16,0)], color:'#89a7c1'},
            ]
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
        }, 1000)
    })
}
